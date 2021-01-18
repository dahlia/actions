FROM bitnami/minideb:latest

RUN apt-get -y update && \
    apt-get install -y wget python3 && \
    rm -rf /var/lib/apt/lists/*

RUN wget -O /bin/yajsv \
    https://github.com/neilpa/yajsv/releases/download/v1.4.0/yajsv.linux.amd64
RUN chmod +x /bin/yajsv

COPY entrypoint.py /entrypoint.py
ENTRYPOINT ["/entrypoint.py"]
