ARG VARIANT=18.04
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu${VARIANT}

SHELL ["/bin/bash", "-c"]

USER $USERNAME

RUN echo hello world again
