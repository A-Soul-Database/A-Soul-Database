pushd tools
python3 getSrt.py
popd
pushd make-front-end
cnpm run build
popd