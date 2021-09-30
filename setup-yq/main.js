const fs = require("fs");
const path = require("path");
const process = require("process");
const fetch = require("node-fetch");
const core = require("@actions/core");
const io = require("@actions/io");
const tc = require("@actions/tool-cache");

const repository = "https://github.com/mikefarah/yq";

const platformMap = {
  win32: "windows"
};

const archMap = {
  mips: "mips64",
  mipsel: "mips64le",
  x32: "386",
  x64: "amd64"
};

async function install() {
  let version = (core.getInput("version") || await getLatestVersion())
    .replace(/^v/, "");
  const platform = platformMap[process.platform] || process.platform;
  const arch = archMap[process.arch] || process.arch;
  core.info(
    "Tries to set up yq with the following version:\n\n" +
    `  Version: ${version}\n` +
    `  Platform: ${platform}\n` +
    `  Arch: ${arch}\n`
  );

  const cacheKey = `${version}-${platform}-${arch}`;
  let cachedPath = tc.find("yq", cacheKey);

  if (cachedPath) {
    core.info(`Found the cached yq installation from:\n\n  ${cachedPath}\n`);
  } else {
    const extracted = await download(version, platform, arch);
    if (extracted == null) {
      process.exit(1);
      return;
    }
    core.info(`Downloaded and extracted to:\n\n  ${extracted}\n`);

    cachedPath = await tc.cacheDir(extracted, "yq", cacheKey);
    core.info(`Installed and cached the yq to:\n\n  ${cachedPath}\n`);
  }

  for (const file of await listDir(cachedPath)) {
    if (!file.startsWith("yq") ||
        platform == "windows" && !file.endsWith(".exe")) continue;
    await io.mv(
      path.join(cachedPath, file),
      path.join(cachedPath, `yq${platform == "windows" ? ".exe" : ""}`)
    );
    break;
  }

  core.addPath(cachedPath);
  core.info("Added the installation directory path to PATH.");
  core.setOutput("version", version);
  core.setOutput("install-dir", cachedPath);
}

async function getLatestVersion() {
  const r = await fetch(
    `${repository}/releases/latest`,
    { redirect: "manual" }
  );
  const location = r.headers.get("location");
  return location.match(/\/v?([^v/]+)$/)[1];
}

async function download(version, platform, arch) {
  const filename =
    `yq_${platform}_${arch}.${platform == "windows" ? "zip" : "tar.gz"}`;
  const url = `${repository}/releases/download/v${version}/${filename}`;
  let downloadPath;
  try {
    downloadPath = await tc.downloadTool(url);
  } catch (e) {
    if (e instanceof tc.HTTPError && e.httpStatusCode === 404) {
      core.setFailed(
        "Failed to download the yq with the following version:\n\n" +
        `  Version: ${version}\n` +
        `  Platform: ${platform}\n` +
        `  Arch: ${arch}\n\n` +
        "It probably is a never released version or an unsupported " +
        "platform/arch.\n"
      );
      return null;
    }
    throw e;
  }
  if (platform == "windows") {
    return await tc.extractZip(downloadPath);
  } else {
    return await tc.extractTar(downloadPath);
  }
}

function listDir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err == null) resolve(files);
      else reject(err);
    });
  });
}

install();
