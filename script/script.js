
$.get("http://localhost:3000/top/playlist/highquality?limit=6").then( function(data){
console.log('推荐歌单') 
console.log(data)
setHighQuality(data)
})
$.get("http://localhost:3000/personalized/newsong?limit=10").then( function(data){
console.log('最新歌曲') 
console.log(data)
setNewSong(data)
})

function setHighQuality(data){
    data.playlists.forEach(
        function(song){
            var tpl = `<li class="highQualityList">
            <div class="cover">
                <img src="https://i.loli.net/2018/01/13/5a599f6266f45.jpg" alt="封面">
                <span>
                    <i class="iconfont icon-headset play-count"></i>
                </span>
            </div>
            <p class="description"></p>
        </li>`
            var $node = $(tpl)
            $node.find('.cover img').attr('src', song.coverImgUrl)
            $node.find('.description').text(song.copywriter)
            
            //判断播放量，以万位显示
            for(var i = 0;i <= $('.play-count').length;i++){
                var count = song.playCount
                if(count > 100000){
                    $node.find('.cover .iconfont').text(parseInt(song.playCount/10000) + '万')
                }else{
                    $node.find('.cover .iconfont').text(song.playCount)
                }
            }
            
            
            $('.songs').eq(0).append($node)
        }
    )
}

function setNewSong(data){
    data.result.forEach(
        function(song){
            var tpl = `<li class="newSongList">
            <h3 class="songName">Friends</h3>
            <p class="profile"><span class="author"></span> - <span class="album"></span></p>
            <a class="playButton" href="#">
                <svg class="icon icon-play">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
                </svg>
            </a>
        </li>`
            var $node = $(tpl)
            $node.find('.songName').text(song.name)
            $node.find('.profile .author').text(function(){
                var authorArr = []
                var newSongAuthor = song.song.artists
                console.log(newSongAuthor)
                newSongAuthor.forEach(function(item){
                    authorArr.push(item.name)
                })
                return authorArr.join(' / ')
            })
            $node.find('.profile .album').text(song.song.name)
            
        
            
            $('.list').eq(0).append($node)
        }
    )
}