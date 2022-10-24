<template>
    <div class="outermost h-screen bg-black">

        <div class="main h-[120vh] bg-[#131417]  pt-10 px-10 -ml-60 overflow-hidden md:px-10 md:-ml-20  md: md:pt-48 xl:h-[130vh] xl:overflow-scroll"
            id="profile">
            <div
                class="outerdiv bg-[#131417] text-white mt-4  mx-60 space-y-8 w-[80vw] h-auto flex flex-col justify-center items-center rounded-sm md:w-[70vw] md:ml-40 md:border-2 md:border-white md:p-8 lg:ml-48  xl:ml-60 2xl:ml-80  ">
                <h1 class="font-bold font-mono text-2xl text-green-500">ADD NEW<span class=" text-yellow-500">
                        QUESTION</span>
                </h1>
                <div class="flex flex-col space-y-2">
                    <label class="font-bold font-mono text-md" for="">Question</label>
                    <input
                        class="h-12 w-80 px-10 text-black rounded-sm  border-2 border-[#f3f7f7] hover:focus cursor-pointer md:w-[60vw]"
                        type="text" v-model="question">
                </div>
                <div class="flex flex-col space-y-2">
                    <label class="font-bold font-mono text-md" for="">Option 1</label>
                    <input
                        class="h-12 w-80 px-10 text-black rounded-sm  border-2 border-[#f3f7f7] hover:focus cursor-pointer md:w-[60vw]"
                        type="text" v-model="a">
                </div>
                <div class="flex flex-col space-y-2">
                    <label class="font-bold font-mono text-md" for="">Option 2</label>
                    <input
                        class="h-12 w-80 px-10 text-black rounded-sm  border-2 border-[#f3f7f7] hover:focus cursor-pointer md:w-[60vw]"
                        type="text" v-model="b">
                </div>
                <div class="flex flex-col space-y-2">
                    <label class="font-bold font-mono text-md" for="">Option 3</label>
                    <input
                        class="h-12 w-80 px-10 text-black rounded-sm  border-2 border-[#f3f7f7] hover:focus cursor-pointer md:w-[60vw]"
                        type="text" v-model="c">
                </div>
                <div class="flex flex-col space-y-2">
                    <label class="font-bold font-mono text-md" for="">Option 4</label>
                    <input
                        class="h-12 w-80 px-10 text-black rounded-sm  border-2 border-[#f3f7f7] hover:focus cursor-pointer md:w-[60vw]"
                        type="text" v-model="d">
                </div>
                <div class="flex flex-col space-y-2"><label class="font-bold font-mono text-md" for="">Answer </label>
                    <select v-model="answer"
                        class="h-12 w-80 px-10 text-black rounded-sm  border-2 border-[#f3f7f7] hover:focus cursor-pointer md:w-[60vw]">
                        <option value="Select Answer" disabled selected>Select Answer</option>
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                        <option value="d">d</option>
                    </select>
                </div>
                <div class="btn flex space-x-10">
                    <button @click="addQuestion()"
                        class="btn h-10 w-32 mt-4 font-bold  border-2 border-green-500 flex justify-center items-center text-green-500  rounded-sm hover:border-yellow-500 hover:text-yellow-500 ">
                        Add Question
                    </button>
                    <button @click="goBack()"
                        class="btn h-10 w-32 mt-4 font-bold  border-2 border-green-500 flex justify-center items-center text-green-500  rounded-sm hover:border-yellow-500 hover:text-yellow-500 ">
                        Go Back
                    </button>
                </div>
            </div>



        </div>
    </div>
</template>
    
<script>
import Vue from 'vue';
import axios from 'axios';
import Config from '../config.js';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast);

export default {
    data() {

        return {

            question: '',
            a: '',
            b: '',
            c: '',
            d: '',
            answer: ''

        }
    },

    methods: {

        goBack() {
            console.log("goBack Function Invoked");
            localStorage.removeItem('quizName');
            this.$router.push({ path: '/teacherHome', replace: true });

        },

        async addQuestion() {

            console.log("Add Question function called");
            const question = this.question;
            const a = this.a;
            const b = this.b;
            const c = this.c;
            const d = this.d;
            const answer = this.answer;

            const doc = {
                question,
                a,
                b,
                c,
                d,
                answer
            }

            console.log("Data Recieved from Body : ", doc);



            if (question && a && b && c && d && answer) {
                const quizName = localStorage.getItem('quizName');
                let bodyObj = { quizName };

                console.log("Just before  getQuizByName api call");
                const result = await axios.post(`${Config.base_url}/quiz/getQuizByName`, bodyObj);
                console.log(result);
                console.log(result.data.quiz);
                console.log(result.data.quiz.questions);
                let questions = result.data.quiz.questions;

                let _id = result.data.quiz._id;
                questions.push(doc);
                console.log("** Questions we are sending in body to addQUestion api call** : ", questions);

                let newDoc = {
                    _id,
                    question,
                }
                console.log("Just before add question api call");
                const response = await axios.post(`${Config.base_url}/quiz/addQuestion`, newDoc);
                console.log(response.data);
                Vue.$toast.open(response.data.message);

            }
            else {

                Vue.$toast.open('ALL fields are required');
            }

        }


    }

}
</script>
    
<style>

</style>