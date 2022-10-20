# deploy built dist, change 
    repo="https://github.com/zheladev/idle-game-template"
    echo " Building & publishing..."
    rm -rf dist
    npm run build
    cd dist
    git init
    git add .
    git commit -m "updating build"
    git remote add origin $repo
    git push --force -u origin master
    echo " Built & published to " + $repo
