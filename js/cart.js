/**
 * Created by zhousg on 2016/3/19.
 */
window.onload = function(){
    deleteFuc();
};

/*ɾ������*/
function deleteFuc(){
    /*
    * 1.�õ����򶯻�����ʾ����
    * 2.�򿪸���
    * 3.���ȡ����ʱ��  ���ص�����
    * 4.ͬʱ���ϸ���
    * */

    /*��ȡ������*/
    var win = document.querySelector('.jd_win');
    /*��������*/
    var bounceBox = win.querySelector('.jd_win_box');
    /*��ȡ���е�ɾ����ť*/
    var deleteBtns = document.querySelectorAll('.delete_box');

    /*��ǰ����İ�ť*/
    var deleteBox;
    /*�����е�ɾ����ť����click�¼�*/
    for(var i = 0 ; i < deleteBtns.length ; i ++ ){
        deleteBtns[i].onclick = function(){
            /*�����ʱ����Ҫ����������  ����class bounceInDown*/
            /*����֮ǰ*/
            win.style.display = "block";
            /*����*/
            bounceBox.className = "jd_win_box bounceInDown";

            deleteBox = this;
            var deleteUp = deleteBox.querySelector('span:first-child');
            /*�򿪸���*/
            /*�ӹ���*/
            deleteUp.style.webkitTransition = "all 1s";
            deleteUp.style.transition = "all 1s";
            /*��ת*/
            deleteUp.style.webkitTransform = "rotate(-30deg) translateY(2px)";
            deleteUp.style.transform = "rotate(-30deg) translateY(2px)";
            /*�ı���תԭ��*/
            deleteUp.style.webkitTransformOrigin = "0 5px";
            deleteUp.style.transformOrigin = "0 5px";

        }
    }

    /*ȡ����ť�󶨵���¼�*/
    bounceBox.querySelector('.cancel').onclick = function(){
        /*���ص�����*/
        win.style.display = "none";
        /*���ϸ���*/
        /*�������֮��*/
        if(deleteBox){
            var deleteUp = deleteBox.querySelector('span:first-child');
            /*transform�ÿ�*/
            deleteUp.style.webkitTransform = "none";
            deleteUp.style.transform = "none";
        }
    }
}
