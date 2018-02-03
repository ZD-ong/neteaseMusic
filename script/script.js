
$.get("http://localhost:3000/top/playlist/highquality?limit=6").then( function(data){
console.log('获取推荐歌单') 
console.log(data)
setHighQuality(data)
})

$.get("http://localhost:3000/personalized/newsong?limit=10").then( function(data){
console.log('获取最新歌曲') 
console.log(data)
setNewSong(data)
})

$.get("http://localhost:3000/top/list?idx=1").then( function(data){
console.log('获取热歌榜') 
console.log(data)
setHotSong(data)
})

$.get("http://localhost:3000/playlist/detail?id=24381616").then( function(data){
console.log('获取歌单详情') 
console.log(data)
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
            var tpl = `<li class="songList">
            <h3 class="songName"></h3>
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


function setHotSong(data){
    data.playlist.tracks.forEach(
        function(song){
             var tpl = `<li class="hotSongList">
            <h3 class="hotSongName"></h3>
            <p class="profile"><span class="hotAuthor"></span> - <span class="hotAlbum"></span></p>
            <a class="playButton" href="#">
                <svg class="icon icon-play">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
                </svg>
            </a>
        </li>`
            var $node = $(tpl)
            $node.find('.hotSongName').text(song.name)

             $node.find('.hotAuthor').text(function(){
                var authorArr = []
                var hotSongAuthor = song.ar
                hotSongAuthor.forEach(function(item){
                    authorArr.push(item.name)
                })
                return authorArr.join(' / ')
            })
            $node.find('.hotAlbum').text(song.al.name)


            $('.hotlist').eq(0).append($node)
            
        }
    )
}