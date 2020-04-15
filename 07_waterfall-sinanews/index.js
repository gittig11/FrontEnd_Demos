var isFirst = true,
  $target = $('#load'),
  isDataArrive = true,
  perPageCount = 10,
  curPage = 1,
  colHeight = [];
  // 每页数目perPageCount、当前页数curPage、高度colHeight

// 载入后就获取数据，之后每次触发onscroll都运行一下
start();
// 监听 scroll 事件
$(window).on('scroll',function(){
  if(!isDataArrive){  //isDataArrive==false时,返回
    return
  }
  // isDataArrive==true
  if(isVisible($target)){  //懒加载：判断 'id = load' 是否进入视野，进入视野后继续获取数据
    start()
  }
})

// 懒加载
function isVisible($el){
  var scrollH = $(window).scrollTop(),
    winH = $(window).height(),
    top = $el.offset().top;
  if(top < winH + scrollH){  //判断元素是否进入视野，瀑布流的原理
    return true
  }else{
    return false
  }
}

// 主流程函数
function start(){
  getData(function(newList){    // newList数组
    // console.log("newList" + newList)
    isDataArrive = true;
    // 对于每一个li节点，传到waterFall($node)函数中
    $.each(newList, function(index, news){   // $.each()是对数组,json和dom结构等的遍历
      var $node = getNode(news)   // jQuery节点
      $node.find('img').on('load', function(){  //节点的图片加载完成后插入该节点中
        $('.picture').append($node)
        // console.log($node,'loaded...')
        waterFall($node)   // 对于新增的li元素，确定其位置，进行瀑布流布局...
      })
    })
  })
  isDataArrive = false   // 即获取并添加之后，修改数据状态
}

// $.ajax({}) 获取数据（JSONP跨域获取数据！）
// pagesize==10, curPage++
function getData(callback){
  $.ajax({
    url:"https://photo.sina.cn/aj/v2/index?cate=military",
    dataType:"jsonp",
    jsonp:"callback",
    data:{
      pagesize: perPageCount,
      page: curPage
    }
  }).done(function(ret){
    // console.log('ret:' + ret)
    // console.log('ret:' + JSON.stringify(ret))
    if(ret && ret.code == 1){
      callback(ret.data)  //如果数据没问题，那么生成节点并摆放好位置
      curPage++
    }else{
      console.log('get error data')
    }
  })
}

// DOM 拼接, DOM节点转为jQuery节点
function getNode(item){
  var tpl = ''
  tpl += '<li class="item">';
  tpl += ' <a href="'+ item.url +'" class="link"><img src="' + item.thumb + '" alt=""></a>';
  tpl += ' <h4 class="title">'+ item.stitle +'</h4>';
  tpl += '<p class="desp">' + item.title +'</p>';
  tpl += '</li>';
  return $(tpl);  // DOM节点转为jQuery节点
}

// 对于新增的li元素(jQuery节点$node)，确定其位置，进行瀑布流布局...
function waterFall($node){
  // jQuery方法，返回li元素$('.item')的的外部宽度，包含 padding 和 border。如需包含 margin，使用outerWidth(true)。
  var nodeWidth = $('.item').outerWidth(true);
  // 首次调用的时候，获取列数colNum，每一列的高度初始化为0
  if(isFirst){
    var colNum = parseInt($('.container').width()/$('.item').outerWidth(true));   //列数
    for(var i = 0; i < colNum ; i++){
      colHeight[i] = 0;
    }
    isFirst = false;
  }
  //
  var index = 0,
      minSumHeight = colHeight[0];  // minSumHeight为第一列的高度

  //根据colNum分为三列，比较得出总高度的最小值。每次运行 waterFall() 都会重新比较找出 minSumHeight
  for(var i = 0; i < colHeight.length ; i++){
    if(colHeight[i] < minSumHeight){
      index = i;
      minSumHeight = colHeight[i];  //minSumHeight重新设置为高度最小的那一列的高度，并得到该列的index值(0,1或2)
    }
  }
  // console.log(colHeight)
  // console.log(minSumHeight)

  //设置CSS样式：节点的位置，放在三列中高度最小的那一列
  $node.css({
    left: nodeWidth * index,
    top: minSumHeight,
    opacity: 1
  })
  // 更新colHeight[index]，加上该列新增元素的高度
  colHeight[index] = $node.outerHeight(true) + colHeight[index]
  // 更新父盒子$('.picture')的高度
  $('.picture').height(Math.max.apply(null, colHeight))
}
