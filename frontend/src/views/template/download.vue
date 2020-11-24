<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="main-article" element-loading-text="Efforts to generate PDF">
<!--      <div>-->
<!--        {{ article.HeaderContent }}-->
<!--      </div>-->
<!--    <div>-->
<!--      {{ article.QuestionContent }}-->
<!--    </div>-->
<!--    <div>-->
<!--      {{ article.AnswerContent }}-->
<!--    </div>-->
<!--    <div>-->
<!--      {{ article.FooterContent }}-->
<!--    </div>-->
    <div ref="content" v-html="list.HeaderContent" />
    <div ref="content" v-html="list.QuestionContent" />
    <div ref="content" v-html="list.AnswerContent" />
    <div ref="content" v-html="list.FooterContent" />

  </div>
</template>

<script>
  import {GetOneTemplate} from "@/api/template";
  import {GetOneExam} from "@/api/examination";
<<<<<<< HEAD
import { render } from "nprogress";

=======
  import Mustache from 'mustache';
>>>>>>> a50b08fb9519153b8c04e60fc1aaaf9921f1f2a0
  export default {
        data() {
            return {
                list: null,
                exam: null,
                fullscreenLoading: true,
                headermustache:null,
            }
        },
        created() {
<<<<<<< HEAD
          console.log('2');
            this.fetchDataExam(),
            this.fetchDataTemplate()
=======
            this.fetchDataExam();
            this.fetchDataTemplate();

        },
        mounted() {
>>>>>>> a50b08fb9519153b8c04e60fc1aaaf9921f1f2a0
        },
        // mounted() {
        //   console.log('1');
        //     this.fetchDataTemplate()
        // },
        methods: {
            fetchDataExam() {
              GetOneExam(this.$store.state.examination).then(response => {
                    this.exam = response.data[0];
<<<<<<< HEAD
                    this.fullscreenLoading = false;
                        this.$nextTick(() => {
                            window.print()
                        })
=======
                    // console.log(this.exam);
>>>>>>> a50b08fb9519153b8c04e60fc1aaaf9921f1f2a0
                })
            },
            fetchDataTemplate(){
              GetOneTemplate(this.$store.state.template).then(response => {
                    this.list = response.data[0];
<<<<<<< HEAD
                    this.fullscreenLoading = false;
                        this.$nextTick(() => {
                            window.print()
                        })
=======
                    this.list.HeaderContent = this.list.HeaderContent.replace(this.list.HeaderContent.match(/\{\{\s*\s*\TemplateName+\s*\}\}/g),Mustache.render("{{TemplateName}}", this.list));
                    //lấy template name để render data

                  this.headermustache = this.list.HeaderContent.match(/\{\{\s*\s*\w+\s*\}\}/g); //lấy ra mustache exam để render data
                  var i;
                  for(i=0;i<this.headermustache.length;i++)
                  {
                      this.list.HeaderContent = this.list.HeaderContent.replace(this.headermustache[i],Mustache.render(this.headermustache[i], this.exam));//loop để thay data render
                  }
                  setTimeout(() => {
                      this.fullscreenLoading = false;
                      this.$nextTick(() => {
                          window.print()
                      })
                  }, 3000)
>>>>>>> a50b08fb9519153b8c04e60fc1aaaf9921f1f2a0
                })
            },
            // findMustache(){
            //     let a = this.list.HeaderContent.match(/\{\{\s*\w+\s*\}\}/g);
            //     console.log(a);
            // }
        }
    }
</script>
<style lang="scss">
  @mixin clearfix {
    &:before {
      display: table;
      content: '';
      clear: both;
    }

    &:after {
      display: table;
      content: '';
      clear: both;
    }
  }

  .main-article {
    padding: 20px;
    margin: 0 auto;
    display: block;
    width: 800px;
  }
  .border-full{
    border-color: #000!important;
    border-top-color: rgb(0, 0, 0) !important;
    border-right-color: rgb(0, 0, 0) !important;
    border-bottom-color: rgb(0, 0, 0) !important;
    border-left-color: rgb(0, 0, 0) !important;
  }
  .border-content{
    border: 3px solid #ccc!important;
    border-top-color: rgb(204, 204, 204) !important;
    border-top-style: solid !important;
    border-top-width: 3px !important;
    border-right-color: rgb(204, 204, 204) !important;
    border-right-style: solid !important;
    border-right-width: 3px !important;
    border-bottom-color: rgb(204, 204, 204) !important;
    border-bottom-style: solid !important;
    border-bottom-width: 3px !important;
    border-left-color: rgb(204, 204, 204) !important;
    border-left-style: solid !important;
    border-left-width: 3px !important;
    border-image-source: initial !important;
    border-image-slice: initial !important;
    border-image-width: initial !important;
    border-image-outset: initial !important;
    border-image-repeat: initial !important;
  }

  .inline {
    display: inline;
    margin-left: 8px;
    margin-right: 10px;
  }
  .inline-title {
    display: inline;
  }

  .header{
    display: flex;
    justify-content: space-between;
  }
  ul {
    list-style: none; /* Remove list bullets */
    margin-top: 1px;
  }

</style>

