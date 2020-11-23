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

  export default {
        data() {
            return {
                list: {
                  TemplateName: '',
                  HeaderContent: '',
                  QuestionContent: '',
                  AnswerContent: '',
                  FooterContent: ''
                },
                exam: {
                  Lecturer: '',
                  Semester: '',
                  Duration: '',
                  Notes: '',
                  Department: '',
                  Course: '',
                  Description:'',
                  CourseCode: '',
                  AcademicYear:''
                },
                fullscreenLoading: true
            }
        },
        created() {
            this.fetchDataExam()
        },
        mounted() {
            this.fetchDataTemplate()
        },
        methods: {
            fetchDataExam() {
              GetOneExam(this.$store.state.examination).then(response => {
                    this.exam = response.data[0];
                    console.log(this.exam);
                    this.fullscreenLoading = false;
                        this.$nextTick(() => {
                            window.print()
                        })
                })
            },
            fetchDataTemplate(){
              GetOneTemplate(this.$store.state.template).then(response => {
                    this.list = response.data[0];
                    console.log(this.list);

                    this.fullscreenLoading = false;
                        this.$nextTick(() => {
                            window.print()
                        })
                })
            }
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

