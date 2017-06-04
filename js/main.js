new Vue({
  el: "#app",
  data: {
  	totalMoney : 0,
    productList:[],
    checkAllFlag:false,
     delFlag:false,
      curProduct:''
  },
  filters: {
    formatMoney: function(value){
      return "￥"+value.toFixed(2);
    }
  },
  mounted: function(){
    this.$nextTick(function(){
        this.cartView();
    })
  },
  methods: {
  	cartView:function(){
  		// var _this=this;
  		// this.$http.get("data/cartData.json").then(function(res) {
  		// 	_this.productList=res.data.result.list;
  		// 	_this.totalMoney=res.data.result.totalMoney;
          //
  		// });
        let _this=this;
        /**
         * //箭头函数=>相当于一个function
         * 作用域指向外层可以直接使用外面的this
         */
        this.$http.get("data/cartData.json").then(res=>{
  			this.productList=res.data.result.list;
  			// this.totalMoney=res.data.result.totalMoney;

  		})
  	},
      changeMoney: function (product,way){
          if(way>0){
              product.productQuantity++;
          }else{
              if(product.productQuantity==1){
                 return false;
              }
              product.productQuantity--;

          }
          this.calcTotalPrice();
      },
      selectedProduct: function(item){
          if(typeof item.checked =='undefined'){
              Vue.set(item,"checked",true) //vue注册data中不存在的键值对
             // Vue.$set(item,"checked",true) //局部注册
          }else{
              item.checked=!item.checked;
          }
          this.calcTotalPrice();

      },
      checkAll:function(flag){
        this.checkAllFlag=flag;
        var _this=this;
        this.productList.forEach(function(item,index){
            if(typeof item.checked =='undefined'){
                _this.$set(item,"checked",_this.checkAllFlag) //vue注册data中不存在的键值对
            }else{
                item.checked=_this.checkAllFlag;
            }
        })
          this.calcTotalPrice();
      },
      calcTotalPrice:function(){
          var _this=this;
          _this.totalMoney=0; //计算前清零
          this.productList.forEach(function(item,index){
              if(item.checked){
               _this.totalMoney+=item.productPrice*item.productQuantity;
              }
          })
      },
      delConfirm:function(item){
          this.delFlag=true;
          this.curProduct=item;
      },
      delProduct:function(){
         var index=this.productList.indexOf(this.curProduct);
         this.productList.splice(index,1);
          //理论调用后台接口删除 this.$http...
      }
  }
});
//全局过滤器filter没加s
Vue.filter("money",function(value,type){  //全局过滤器  在任何一个页面都可以使用
    return "￥"+value.toFixed(2) + type;
})
