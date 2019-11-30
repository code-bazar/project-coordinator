#!/bin/bash

VERSION=$1

cd ..
docker build -t project-coordinator:${VERSION} .