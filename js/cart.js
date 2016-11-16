/**
 * Created by zhousg on 2016/3/19.
 */
window.onload = function(){
    deleteFuc();
};

/*删除方法*/
function deleteFuc(){
    /*
    * 1.让弹出框动画的显示出来
    * 2.打开盖子
    * 3.点击取消的时候  隐藏弹出框
    * 4.同时盖上盖子
    * */

    /*获取弹出框*/
    var win = document.querySelector('.jd_win');
    /*弹出盒子*/
    var bounceBox = win.querySelector('.jd_win_box');
    /*获取所有的删除按钮*/
    var deleteBtns = document.querySelectorAll('.delete_box');

    /*当前点击的按钮*/
    var deleteBox;
    /*给所有的删除按钮加上click事件*/
    for(var i = 0 ; i < deleteBtns.length ; i ++ ){
        deleteBtns[i].onclick = function(){
            /*点击的时候需要盒子做动画  加上class bounceInDown*/
            /*动画之前*/
            win.style.display = "block";
            /*动画*/
            bounceBox.className = "jd_win_box bounceInDown";

            deleteBox = this;
            var deleteUp = deleteBox.querySelector('span:first-child');
            /*打开盖子*/
            /*加过渡*/
            deleteUp.style.webkitTransition = "all 1s";
            deleteUp.style.transition = "all 1s";
            /*旋转*/
            deleteUp.style.webkitTransform = "rotate(-30deg) translateY(2px)";
            deleteUp.style.transform = "rotate(-30deg) translateY(2px)";
            /*改变旋转原点*/
            deleteUp.style.webkitTransformOrigin = "0 5px";
            deleteUp.style.transformOrigin = "0 5px";

        }
    }

    /*取消按钮绑定点击事件*/
    bounceBox.querySelector('.cancel').onclick = function(){
        /*隐藏弹出框*/
        win.style.display = "none";
        /*盖上盖子*/
        /*当点击过之后*/
        if(deleteBox){
            var deleteUp = deleteBox.querySelector('span:first-child');
            /*transform置空*/
            deleteUp.style.webkitTransform = "none";
            deleteUp.style.transform = "none";
        }
    }
}
