
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
                $('.page-main').addClass('hide')
                $('.page-profile').removeClass('hide')

                var mybody = document.getElementsByTagName('body')[0]



                //滑动处理

                var startX, startY, moveEndX, moveEndY, X, Y

                mybody.addEventListener('touchstart', function (e) {

                    e.preventDefault()

                    startX = e.touches[0].pageX

                    startY = e.touches[0].pageY

                }, false)

                mybody.addEventListener('touchmove', function (e) {

                    e.preventDefault()

                    moveEndX = e.changedTouches[0].pageX

                    moveEndY = e.changedTouches[0].pageY

                    X = moveEndX - startX

                    Y = moveEndY - startY



                    if (Math.abs(X) > Math.abs(Y) && X > 100) {

                        $('.page-main').removeClass('hide')
                        $('.page-profile').addClass('hide')

                    }


                })

                $.get("http://localhost:3000/playlist/detail?id=" + songId).then(function (data2) {

                    $('.profile-wrap').html('')
                    $('.page-profile .tag-item').html('')
                    $('.profile-songs').html('')


                    console.log('获取歌单详情')
                    console.log(data2)
                    setProfileCover(data2)
                    setProfileTag(data2)
                    function setProfileCover(data2) {
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
                        $('.profile .background').attr('style', "background-image:url(" + data2.result.coverImgUrl + ")")
                        var $node2 = $(tp)
                        $node2.find('.pro-img').attr('src', data2.result.coverImgUrl)
                        $node2.find('.author-img').attr('src', data2.result.creator.avatarUrl)
                        $node2.find('.title-wrap h3').text(data2.result.name)
                        $node2.find('.author p').text(data2.result.creator.nickname)
                        if (song.playCount > 100000) {
                            $node2.find('.listen .iconfont').text(parseInt(song.playCount / 10000) + '万')
                        } else {
                            $node2.find('.listen .iconfont').text(song.playCount)
                        }
                        $('.profile-wrap').append($node2)
                    }
                    function setProfileTag(data2) {
                        var tp2 = `
                        <h3 class="tags">标签：
                        </h3>
                        <p class="shortp hide"></p>
                        <span class="down">
                            <i class="iconfont icon-down"></i>
                       </span>
                        `
                        var $node3 = $(tp2)
                        console.log($node3.eq(2))
                        $node3.eq(2).text('简介：' + data2.result.description)
                        var arr = data2.result.tags
                        arr.forEach(function (element) {
                            $node3.first().append('<span class="tag"> ' + element + '</span>')
                        })

                        $('.page-profile .tag-item').append($node3)
                        $('.down').on('click', function () {
                            let $shortp = $('.shortp')
                            let $updown = $('.down .iconfont')
                            if ($shortp.hasClass('hide')) {
                                $shortp.removeClass('hide').addClass('show')
                            }
                            else if ($shortp.hasClass('show')) {
                                $shortp.removeClass('show').addClass('hide')
                            }
                            if ($updown.hasClass('icon-down')) {
                                $updown.removeClass('icon-down').addClass('icon-up')
                            } else if ($updown.hasClass('icon-up')) {
                                $updown.removeClass('icon-up').addClass('icon-down')
                            }
                        })

                    }
                    setProfileSongs(data2)
                    function setProfileSongs(data2) {
                        var index = 1
                        data2.result.tracks.slice(0, 20).forEach(
                            function (song) {
                                if (index < 10) {
                                    index = '0' + index
                                }
                                var tp3 = `<span class="index">${index}</span>
                        <li class="proSongList">
                            <h3 class="proSongName"></h3>
                            <p class="pro-profile">
                                <span class="proAuthor"></span> -
                                <span class="proAlbum"></span>
                            </p>
                            <a class="playButton" href="#">
                                <svg class="icon icon-play">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
                                </svg>
                            </a>
                        </li>`
                                var $node4 = $(tp3)
                                $node4.find('.proSongName').text(song.name)
                                index = parseInt(index) + 1

                                $node4.find('.proAuthor').text(function () {
                                    var authorArr = []
                                    var proSongAuthor = song.artists
                                    proSongAuthor.forEach(function (item) {
                                        authorArr.push(item.name)
                                    })
                                    return authorArr.join(' / ')
                                })

                                $node4.find('.proAlbum').text(song.album.name)


                                $('.profile-songs').append($node4)
                            }
                        )


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
            $node.on('click', function () {
                var id = song.song.id
                var url ="http://music.163.com/song/media/outer/url?id=" + id + ".mp3"
                console.log(song.song.id)
                $('audio').attr('src', url)
                $('.page-main').addClass('hide')
                $('.page-record').removeClass('hide')

                $('.record-cover').attr('src',song.song.album.picUrl)

                var mybody = document.getElementsByTagName('body')[0]



                //滑动处理

                var startX, startY, moveEndX, moveEndY, X, Y

                mybody.addEventListener('touchstart', function (e) {

                    e.preventDefault()

                    startX = e.touches[0].pageX

                    startY = e.touches[0].pageY

                }, false)

                mybody.addEventListener('touchmove', function (e) {

                    e.preventDefault()

                    moveEndX = e.changedTouches[0].pageX

                    moveEndY = e.changedTouches[0].pageY

                    X = moveEndX - startX

                    Y = moveEndY - startY



                    if (Math.abs(X) > Math.abs(Y) && X > 100) {

                        $('.page-main').removeClass('hide')
                        $('.page-record').addClass('hide')

                    }


                })

            })
            
            

            $('.list').append($node)
        }
    )
    $('section.disk .circle').on('click', function(){
        if(document.getElementById('playaudio').paused){
            document.getElementById('playaudio').play()
            $('section.disk .circle .button').addClass('hide')
        }else{
            document.getElementById('playaudio').pause()
            $('section.disk .circle .button').removeClass('hide')
        }
    })
}


function setHotSong(data) {
    var index = 1
    var tracks = data.playlist.tracks.slice(0, 20)
    tracks.forEach(
        function (song) {
            if (index < 10) {
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
            
            $node.on('click', function () {
                var id = song.id
                var url ="http://music.163.com/song/media/outer/url?id=" + id + ".mp3"
                // $('audio').attr('src', url)
                $('.page-main').addClass('hide')
                $('.page-record').removeClass('hide')

                $('.record-cover').attr('src',song.al.picUrl)

                var mybody = document.getElementsByTagName('body')[0]



                //滑动处理

                var startX, startY, moveEndX, moveEndY, X, Y

                mybody.addEventListener('touchstart', function (e) {

                    e.preventDefault()

                    startX = e.touches[0].pageX

                    startY = e.touches[0].pageY

                }, false)

                mybody.addEventListener('touchmove', function (e) {

                    e.preventDefault()

                    moveEndX = e.changedTouches[0].pageX

                    moveEndY = e.changedTouches[0].pageY

                    X = moveEndX - startX

                    Y = moveEndY - startY



                    if (Math.abs(X) > Math.abs(Y) && X > 100) {

                        $('.page-mian').removeClass('hide')
                        $('.page-record').addClass('hide')

                    }


                })

            })

            $('.hotlist').eq(0).append($node)

        }
    )

}
