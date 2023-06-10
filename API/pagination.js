export class Paginate {
    constructor(ul, data, itemsperpage, currentpage) {
        this.ul = ul;
        this.data = data;
        this.itemsperpage = itemsperpage;
        this.currentpage = currentpage;
    }
    pagination() {
        let litag = "";
        let dataPaginate = this.data.pagination;
        let totalPage = Math.ceil(dataPaginate.total/this.itemsperpage);
         if(this.currentpage == 1) {
            litag += `<li class="page-item"><a class="page-link inactive" href="#">Previous</a></li>`;
         }
         else{
            litag += `<li class="page-item"><a class="page-link" href="#">Previous</a></li>`;
         }
         for (let i = 0; i < totalPage; i++) {
            litag += `<li class="page-item"><a class="page-link" href="#">${i + 1}</a></li>`;
            
         }
         if(this.currentpage == totalPage) {
            litag += `<li class="page-item"><a class="page-link inactive" href="#">Next</a></li>`;
         }else{
            litag += `<li class="page-item"><a class="page-link" href="#">Next</a></li>`;
         }
         this.ul.innerHTML = litag;
    }
}