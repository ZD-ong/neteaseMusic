
$.get("http://localhost:3000/top/playlist/highquality?limit=6").then(function (data) {
    console.log('获取推荐歌单')
    console.log(data)
    setHighQuality(data)
})

$.get("http://localhost:3000/personalized/newsong?limit=10").then(function (data) {
    console.log('获取最新歌曲')
    console.log(data)
    setNewSong(data)
})

$.get("http://localhost:3000/top/list?idx=1").then(function (data) {
    console.log('获取热歌榜')
    console.log(data)
    setHotSong(data)
})





function setHighQuality(data) {
    data.playlists.forEach(
        function (song) {
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
            for (var i = 0; i <= $('.play-count').length; i++) {
                var songId = song.id
                var count = song.playCount
                if (count > 100000) {
                    $node.find('.cover .iconfont').text(parseInt(song.playCount / 10000) + '万')
                } else {
                    $node.find('.cover .iconfont').text(song.playCount)
                }
            }

            $('.songs').eq(0).append($node)
            $node.on('click', function () {
                $.get("http://localhost:3000/playlist/detail?id=" + songId).then(function (data2) {
                    $('.profile-wrap').html('')
                    $('.page-profile .tag-item').html('')
                    console.log('获取歌单详情')
                    console.log(data2)
                    setProfileCover(data2)
                    setProfileTag(data2)
                    function setProfileCover(data2){
                        var tp = `
                                <div class="pro-cover">
                                    <img class="pro-img "src=" " alt="封面">
                                    <span class="logo">歌单</span>
                                    <span class="listen">
                                        <i class="iconfont icon-headset"></i>
                                    </span>
                                </div>
                                <div class="title">
                                    <div class="title-wrap">
                                        <h3>曾经等你下课的人，现在带你回家了吗？</h3>
                                    </div>
            
                                    <div class="author clearfix">
                                        <img class="author-img" src="//i.loli.net/2018/02/03/5a757abda5605.jpeg" alt="头像">
                                        <p>作者</p>
                                    </div>
                                </div>`
                    $('.profile .background').attr('style',"background-image:url(" + data2.result.coverImgUrl + ")")
                    var $node2 = $(tp)
                    $node2.find('.pro-img').attr('src', data2.result.coverImgUrl)
                    $node2.find('.author-img').attr('src', data2.result.creator.avatarUrl)
                    $node2.find('.title-wrap h3').text(data2.result.name)
                    $node2.find('.author p').text(data2.result.creator.nickname)
                    $('.profile-wrap').append($node2)
                    }
                    function setProfileTag(data2){
                        var tp2 = `
                        <h3 class="tags">标签：
                        <span class="tag"></span>
                        </h3>
                        <p class="shortprofile">简介：幼儿园常常给你带糖果的TA还有印象吗?</p>
                        <p class="shortp hide">青春哪有那么多的轰轰烈烈。不能说出口的喜欢，才是单薄青春里，最厚实的秘密。初恋是人生中重要的一页，不管它是否过去，我们依旧在执着地寻找和等待着，值得付出一切的悸动和心跳。</p>
                        <span class="down">
                            <i class="iconfont icon-down"></i>
                       </span>
                        `
                        var $node3 = $(tp2)
                        console.log(data2.result.tags)
                        var arr = data2.result.tags
                        arr.forEach(function(element) {
                            console.log(element)
                            $node3.find('.tag').text(element)
                            $node3.find('.tags').text('<span class="tag"> ' + element + '</span>')
                          })
                        
                        $('.page-profile .tag-item').append($node3)
                    }
                    
                })
                
            })

        }
    )


}

function setNewSong(data) {
    data.result.forEach(
        function (song) {
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
            $node.find('.profile .author').text(function () {
                var authorArr = []
                var newSongAuthor = song.song.artists
                newSongAuthor.forEach(function (item) {
                    authorArr.push(item.name)
                })
                return authorArr.join(' / ')
            })
            $node.find('.profile .album').text(song.song.name)



            $('.list').eq(0).append($node)
        }
    )
}


function setHotSong(data) {
    var index = 1
    data.playlist.tracks.forEach(
        function (song) {
            if(index < 10){
                index = '0' + index
            }
            var tpl =
            `
            <span class="index">${index}</span>
            <li class="hotSongList">
                <h3 class="hotSongName"></h3>
                <p class="profile"><span class="hotAuthor"></span> - <span class="hotAlbum"></span></p>
                <a class="playButton" href="#">
                <svg class="icon icon-play">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
                </svg>
                </a>
            </li>
            `
            
            var $node = $(tpl)
            $node.find('.hotSongName').text(song.name)
            
            index = parseInt(index) + 1
            
            $node.find('.hotAuthor').text(function () {
                var authorArr = []
                var hotSongAuthor = song.ar
                hotSongAuthor.forEach(function (item) {
                    authorArr.push(item.name)
                })
                return authorArr.join(' / ')
            })
            $node.find('.hotAlbum').text(song.al.name)


            $('.hotlist').eq(0).append($node)

        }
    )
    
}
