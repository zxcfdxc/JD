/**
 * Created by zhousg on 2016/3/16.
 */
/*页面加载完成之后执行*/

window.onload = function(){
    /*搜索效果*/
    search();
    /*轮播图*/
    banner();
    /*秒杀*/
    downTime();

};
/*搜索效果*/
function search(){
    /*
     * 1.在页面滚动的时候  盒子的透明度在不断的加深
     * 2.当页面滚动的高度超过  banner的高度的时候  透明度不变
     * */

    /*获取到我们要操作的盒子*/
    /*搜索盒子*/
    var searchDom = document.getElementsByClassName('jd_header_box')[0];
    /*banner盒子*/
    var bannerDom = document.getElementsByClassName('jd_banner')[0];
    /*获取banner的高度*/
    var height = bannerDom.offsetHeight;

    /*我们需要监听页面滚动事件*/
    window.onscroll = function () {
        /*获取距离顶部的高度*/
        var top = document.body.scrollTop;
        /*判断*/
        var opacity = 0;/*默认是完全透明的*/
        if(top < height){
            opacity = top/height * 0.85;/*根据比例  最大的透明度0.85*/
        }else{
            opacity = 0.85;
        }
        /*设置背景颜色*/
        searchDom.style.background = "rgba(201,21,35,"+opacity+")";
    }

}

/*轮播图*/
function banner(){
    /*
     * 1.自动的滚动起来
     * 2.小圆点也要跟着滚动起来
     * 3.滚动的时候需要动画
     * 4.图片盒子需要滑动
     * 5.当滑动的距离不超过 1/3 让它吸附回去
     * 6.当超过了的时候  根据滑动的方向来  是跳下一张还是上一张
     * */

    /*获取banner*/
    var banner = document.getElementsByClassName('jd_banner')[0];
    /*获取图片盒子*/
    var imageBox = banner.getElementsByTagName('ul')[0];
    /*获取点盒子*/
    var pointBox = banner.getElementsByTagName('ul')[1];
    /*获取所有的点*/
    var points = pointBox.getElementsByTagName('li');


    /*获取宽度*/
    var width = banner.offsetWidth;

    /*加过渡*/
    var addTransition = function(){
        imageBox.style.webkitTransition = 'all 0.2s';/*兼容*/
        imageBox.style.transition = 'all 0.2s';
    };
    /*删除过渡*/
    var removeTransition = function(){
        imageBox.style.webkitTransition = 'none';/*兼容*/
        imageBox.style.transition = 'none';
    };
    /*定位*/
    /*当前的定位*/
    var setTranslateX = function(x){
        imageBox.style.webkitTransform = 'translateX('+x+'px)';/*兼容*/
        imageBox.style.transform = 'translateX('+x+'px)';
    }
    /*设置点的当前样式*/
    var setPoint = function(index){
        for(var i = 0 ; i < points.length ; i ++){
            points[i].className = " ";
        }
        /*找到当前图片对应的点*/
        points[index-1].className = "now";
    };


    var index = 1;/*默认的索引位子*/
    var timer = setInterval(function(){
        index ++;
        /*加过渡*/
        addTransition();
        /*改变位子*/
        setTranslateX(-index*width);
    },3000);


    /*transitionEnd   过渡结束的时候触发的事件*/
    /*animationEnd  动画结束的时候触发的事件*/
    /*过渡结束的时候判断当前图片的索引位子  来无缝的衔接*/

    itcast.transitionEnd(imageBox,function(){
        /*运行到这个位子  index 0-9 */
        if(index >= 9){
            /*当第9张图片动画结束的时候  让它瞬间定位到第一张的位子*/
            index = 1;
            /*删除过渡*/
            removeTransition();
            /*定位*/
            setTranslateX(-index * width);
        }else if(index <= 0){
            /*当第0张图片动画结束的时候  让它瞬间定位到最后一张的位子*/
            index = 8;
            /*删除过渡*/
            removeTransition();
            /*定位*/
            setTranslateX(-index * width);
        }
        /*运行到这个位子  index 1-8 */
        /*设置点*/
        setPoint(index);
    });

    /*记录触摸开始的时候X的坐标*/
    var startX = 0;
    /*记录滑动的时候的X的坐标*/
    var moveX = 0;
    /*滑动的距离*/
    var distanceX = 0;
    /*记录有没有滑动过*/
    var isMove = false;

    imageBox.addEventListener('touchstart',function(e){
        /*记录x的位子*/
        startX = e.touches[0].clientX;
        /*清除定时器*/
        clearInterval(timer);
    });
    imageBox.addEventListener('touchmove',function(e){
        /*不停的滑动的时候的X的坐标*/
        moveX = e.touches[0].clientX;
        /*改变的距离*/
        distanceX = moveX - startX;
        console.log(distanceX);
        /*删除过渡*/
        removeTransition();
        /*改变位子*/
        setTranslateX(-index*width+distanceX);
        /*设置已经滑动过*/
        isMove = true;

    });
    /*在最终完成touchend事件触发来操作   因为在模拟器中会有bug*/
    window.addEventListener('touchend',function(e){
        /*如果滑动的距离超过三分之一*/
        if(Math.abs(distanceX) > (width/3) && isMove){
            /*上一张*/
            if(distanceX > 0 ){
                index --;
            }
            /*下一张*/
            else {
                index ++;

            }
            addTransition();
            setTranslateX(-index * width);
        }else{
            /*不超过三分之一吸附回去*/
            addTransition();
            setTranslateX(-index * width);
        }



        /*重置记录的参数的值*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        /*加上定时任务*/
        clearInterval(timer);
        timer = setInterval(function(){
            index ++;
            /*加过渡*/
            addTransition();
            /*改变位子*/
            setTranslateX(-index*width);
        },3000);
    });


    /*  zepto js 类似jquery的框架  touch*/




    /*imageBox.addEventListener('webkitTransitionEnd',function(){
        /!*运行到这个位子  index 0-9 *!/
        if(index >= 9){
            /!*当第9张图片动画结束的时候  让它瞬间定位到第一张的位子*!/
            index = 1;
            /!*删除过渡*!/
            removeTransition();
            /!*定位*!/
            setTranslateX(-index * width);
        }else if(index <= 0){
            /!*当第0张图片动画结束的时候  让它瞬间定位到最后一张的位子*!/
            index = 8;
            /!*删除过渡*!/
            removeTransition();
            /!*定位*!/
            setTranslateX(-index * width);
        }
        /!*运行到这个位子  index 1-8 *!/
        /!*设置点*!/
        setPoint(index);
    });
    imageBox.addEventListener('transitionEnd',function(){
        /!*运行到这个位子  index 0-9 *!/
        if(index >= 9){
            /!*当第9张图片动画结束的时候  让它瞬间定位到第一张的位子*!/
            index = 1;
            /!*删除过渡*!/
            removeTransition();
            /!*定位*!/
            setTranslateX(-index * width);
        }else if(index <= 0){
            /!*当第0张图片动画结束的时候  让它瞬间定位到最后一张的位子*!/
            index = 8;
            /!*删除过渡*!/
            removeTransition();
            /!*定位*!/
            setTranslateX(-index * width);
        }
        /!*运行到这个位子  index 1-8 *!/
        /!*设置点*!/
        setPoint(index);
    });
*/

}


/*倒计时*/
var downTime = function(){
    /*时间*/
    var time = 5 * 60 * 60;

    /*时间盒子*/
    var timeBox = document.getElementsByClassName('sk_time')[0];
    /*所有的SPAN*/
    var spans = timeBox.getElementsByTagName('span');

    var timer = setInterval(function(){
        if(time <= 0){
            clearInterval(timer);
            return false;
        }

        time --;
        var h = Math.floor(time/3600);/*小时*/
        var m = Math.floor((time%3600)/60);/*分钟*/
        var s = time%60;/*秒*/
//      console.log(h+":"+m+":"+s);
        /*放置html*/
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;
    },1000);
}