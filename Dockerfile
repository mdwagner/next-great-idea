ARG VARIANT=18.04
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu${VARIANT}

SHELL ["/bin/bash", "-c"]

# install apt packages
RUN apt-get update \
 && export DEBIAN_FRONTEND=noninteractive \
 && apt-get -y install --no-install-recommends libc6-dev libevent-dev libpcre2-dev libpng-dev libssl1.0-dev libyaml-dev zlib1g-dev libxml2-dev libyaml-dev libgmp-dev libreadline-dev libz-dev build-essential

#dummy3
# pinned verions
ARG CRYSTAL_VERSION="0.34.0"
ARG NODE_MAJOR_VERSION="12"
ARG RIPGREP_VERSION="12.1.1"
ARG LUCKY_CLI_VERSION="v0.21.0"
ARG HIVEMIND_VERSION="v1.0.6"

# install crystal
RUN wget --quiet https://github.com/crystal-lang/crystal/releases/download/${CRYSTAL_VERSION}/crystal_${CRYSTAL_VERSION}-1_amd64.deb -O /tmp/crystal.deb \
 && dpkg -i /tmp/crystal.deb \
 && rm /tmp/crystal.deb \
 && crystal --version

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_${NODE_MAJOR_VERSION}.x | bash - \
 && apt-get install -y nodejs \
 && node -v

# install ripgrep
RUN wget --quiet https://github.com/BurntSushi/ripgrep/releases/download/${RIPGREP_VERSION}/ripgrep_${RIPGREP_VERSION}_amd64.deb -O /tmp/ripgrep.deb \
 && dpkg -i /tmp/ripgrep.deb \
 && rm /tmp/ripgrep.deb \
 && rg --version

# install lucky cli
RUN git clone https://github.com/luckyframework/lucky_cli /tmp/lucky_cli --branch ${LUCKY_CLI_VERSION} \
 && cd /tmp/lucky_cli \
 && shards install \
 && crystal build src/lucky.cr \
 && mv lucky /usr/local/bin \
 && cd $HOME \
 && rm -rf /tmp/lucky_cli \
 && lucky -v

# install hivemind (process manager)
RUN wget --quiet https://github.com/DarthSim/hivemind/releases/download/${HIVEMIND_VERSION}/hivemind-${HIVEMIND_VERSION}-linux-amd64.gz -O /tmp/hivemind.gz \
 && gunzip /tmp/hivemind.gz \
 && chmod +x /tmp/hivemind \
 && mv /tmp/hivemind /usr/local/bin \
 && hivemind -v
