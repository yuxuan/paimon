#!/bin/bash
set -e

echo 'build start'

pnpm install --frozen-lockfile --registry=http://registry.npm.baidu-int.com

pnpm build

# 复制 .next 目录下的产出到 output 目录下
rm -rf output
mkdir output
cp -r .next ./output
cp deploy.json ./output
echo 'build end'