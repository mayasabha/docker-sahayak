#!/bin/bash
cd custom_nodes
for d in */ ; do
    cd "$d" && npm install
    echo "Packages installed in $d"
    cd "../../" && npm install "./custom_nodes/$d"
    cd ./custom_nodes
done
echo "Packages installed"