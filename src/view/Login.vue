<template>
    <div id="login" class="base animate__animated animate__bounceInDown">
        <!-- <div style="margin: 30px" /> -->
        <el-form label-width="200px" :model="formLabelAlign" class="myInput" style="max-width: 860px;min-width:450px;">
            <el-form-item label="邮箱:">
                <el-input v-model="formLabelAlign.email" placeholder="输入邮箱" />
            </el-form-item>
            <!-- <el-form-item>
                
            </el-form-item> -->
            <el-form-item label="验证码:">
                <el-input v-model="formLabelAlign.code" placeholder="输入验证码" />

            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="codeBtn" ref="codeBtn" @click="getCode()">{{ code == '获取验证码' ? code : code
                    + ' s' }}</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()" v-if="isLoading">登录</el-button>
                <el-button type="primary" :loading-icon="Eleme" loading v-else>Loading</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { emailLogin, getCodeApi } from '../api/login.js'
import { da } from 'element-plus/es/locale/index.js'
const code = ref<Number | String>('获取验证码')
const codeBtn = ref()
const isLoading = ref(true)
const formLabelAlign = reactive({
    email: '1544748556@qq.com',
    code: '',
})
const submitForm = async () => {
    if (formLabelAlign.email == '' || formLabelAlign.code == '') {
        ElMessage.error('邮箱或验证码为空！')
        return false
    }
    isLoading.value = false
    const { data } = await emailLogin(formLabelAlign)
    if (data.code == 200) {
        console.log(data)
        ElMessage.success('登录成功！' + data.data.username)
        isLoading.value = true

        const login = document.getElementById('login')
        if (login != null) {
            login.className = "animate__animated animate__backOutUp"
            login.style.height = '0px'
            login.style.marginTop = '0px'
        }


    } else {
        ElMessage.error(data.msg)
        isLoading.value = true
    }

}

const getCode = async () => {
    document.querySelector('.codeBtn').setAttribute('disabled', 'true')

    const { data } = await getCodeApi(formLabelAlign)
    console.log(data)
    if (data.code == 200) {
        ElMessage.success('发送成功！')
        code.value = 60
        const timer = setInterval((
        ) => {
            code.value = code.value - 1
            if (code.value < 0) {
                clearInterval(timer)
                code.value = "获取验证码"
                document.querySelector('.codeBtn').removeAttribute('disabled')
            }
        }, 1000)
    } else {
        ElMessage.error(data.msg)

    }
}

</script>
<style scoped>
.base {
    background: #ddd6f3;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #faaca8, #ddd6f3);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #faaca8, #ddd6f3);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    padding-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.myInput{
    background: url(../assets/img/bgm1.png) no-repeat center center ;
    background-size: 300px;
    background-position-x: -50px;

}
</style>
  