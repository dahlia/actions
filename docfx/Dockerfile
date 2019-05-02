FROM mono:5

LABEL "com.github.actions.name" = "docfx"
LABEL "com.github.actions.description" = "Build docs using DocFX"
LABEL "com.github.actions.icon" = "book"
LABEL "com.github.actions.color" = "gray-dark"

LABEL "repository" = "http://github.com/dahlia/actions"
LABEL "homepage" = "https://github.com/dahlia/actions/tree/master/docfx"
LABEL "maintainer" = "Hong Minhee <hong.minhee@gmail.com>"

RUN apt-get -y update && \
    apt-get install -y apt-transport-https curl gnupg2 && \
    curl https://packages.microsoft.com/keys/microsoft.asc | \
      apt-key add - && \
    echo "deb [arch=amd64]" \
      "https://packages.microsoft.com/repos/microsoft-debian-stretch-prod" \
      "stretch main" > /etc/apt/sources.list.d/microsoft.list && \
    rm -rf /var/lib/apt/lists/*

RUN apt-get -y update && \
    apt-get install -y git powershell unzip && \
    rm -rf /var/lib/apt/lists/*

RUN curl -L -o /tmp/docfx.zip \
      https://github.com/dotnet/docfx/releases/download/v2.42.1/docfx.zip && \
    unzip -d /docfx /tmp/docfx.zip && \
    rm /tmp/docfx.zip

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
