<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="main-article" element-loading-text="Efforts to generate PDF">
    <button id="buttonPrint" v-on:click="printQuiz()">Print</button>
    <img id="answersheet" src="https://content.zipgrade.com/static/pdfs/ZipGrade50QuestionV2.png"/>
    <div v-if="list" ref="content" v-html="list.HeaderContent" />
    <div style="margin-bottom: 10px">
      <span style="border-style: solid; margin: 3px; padding: 3px; ">Quiz Code: {{quizcode}}</span>
      </div>
      <div v-for="item in quizcontent" :key="item.quizcontentID">
        <div style="display:inline;">{{item.Question}}</div>
        <template v-if="item.Type == 'Single Choice'">
          <div v-for="answer in item.Answer" :key="answer">
          <div style="display:inline; margin-left: 5%;">{{ answer }}</div>
          </div>
        </template>
        <template v-if="item.Type == 'Multiple Choice'">
          <div v-for="answer in item.Answer" :key="answer">
          <div style="display:inline; margin-left: 5%;">{{ answer }}</div>
          </div>
        </template>
        <template v-else-if="item.Type == 'Match'">
          <div v-for="answer in item.Answer" :key="answer">
          <div style="display:inline; margin-left: 5%;">{{ answer }}</div>
          </div>
          <p style="display:inline; margin-left: 5%;">*Match correct character of questions to these answers</p>
          <div v-for="(ca, index) in item.CorrectAnswer" :key="index">
          <div style="display:inline; margin-left: 5%;">__.{{ ca }}</div>
          </div>
        </template>
      </div>
  </div>
</template>

<script>
  import {GetOneTemplate} from "@/api/template";
  import {GetOneExam} from "@/api/examination";
  import {GetQuizContent} from "@/api/quiz";
  import { render } from "nprogress";
  import Mustache from 'mustache';

  export default {
        data() {
            return {
                list: null,
                exam: null,
                quizcontent: null,
                quizcode: null,
                test: 0,
                QID: 0,
                fullscreenLoading: true,
                headermustache:null,
            }
        },
        created() {
             this.loadingScreen(),
            this.fetchDataExam(),
            this.fetchDataTemplate(),
            this.quizcode = this.$store.state.quizcode;
        },
        // mounted() {
        //     this.fetchDataContent()
        // },
        beforeUpdate() {
            this.fetchDataContent()
        },
        methods: {
            printQuiz() {
              var x = document.getElementById("buttonPrint");
              x.style.display = "none";
              window.print();
              x.style.display = "block";
            },
            loadingScreen(){
                setTimeout(() => {
                    this.fullscreenLoading = false;
                    this.$nextTick(() => {
                        window.print()
                    })
                }, 10000)

            },
            fetchDataExam() {
              GetOneExam(this.$store.state.examination).then(response => {
                    this.exam = response.data[0];
                })
            },
             fetchDataContent() {
               GetQuizContent(this.$store.state.quiz).then(response => {
                    this.quizcontent = response.data;
                })
            },
            fetchDataTemplate(){
              GetOneTemplate(this.$store.state.template).then(response => {
                    this.list = response.data[0];
                    this.list.HeaderContent = this.list.HeaderContent.replace(this.list.HeaderContent.match(/\{\{\s*\s*\TemplateName+\s*\}\}/g),Mustache.render("{{TemplateName}}", this.list));
                    //lấy template name để render data

                  this.headermustache = this.list.HeaderContent.match(/\{\{\s*\s*\w+\s*\}\}/g); //lấy ra mustache exam để render data
                  var i;
                  for(i=0;i<this.headermustache.length;i++)
                  {
                      this.list.HeaderContent = this.list.HeaderContent.replace(this.headermustache[i],Mustache.render(this.headermustache[i], this.exam));//loop để thay data render
                  }
                })
            },
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
  #answersheet {
    height: 100%;
    width: 100%;
  }
</style>

