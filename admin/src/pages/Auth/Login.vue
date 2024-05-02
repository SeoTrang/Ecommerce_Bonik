

<script setup>
  import { ref, onMounted } from "vue";
  import { toast } from "vue3-toastify";
  import authAPI from '../../services/NodeAPI/authAPI';
  const email = ref('');
  const password = ref('');
  const handleLogin = async() => {
    console.log(email.value);
    console.log(password.value);
    let result = await authAPI.login(email.value, password.value);
        console.log(result);
        if(!result) {
            
          return toast.error('Email hoặc mật khẩu không hợp lệ 😔 !')
        }
        // let accessTokenTemp = Cookies.get("accessToken");
        // console.log(accessTokenTemp);
        // await dispatch(fetchUserData());
        if(result == "403"){
          return toast.error('Tài khoản không có quyền truy cập 😊 !')
        }
        window.location.href = '/';
        return toast.success('Đăng nhập thành công 😊 !')
  }

    

</script>
<style >
    @import './auth.css';
</style>
<template>
    <div class='auth'>
            <div class="row justify-content-center">
                <div class="col-xl-6 col-lg-8 ">
                    <div class='login box-auth'>

                        <div class="title-top text-center">
                            <h2>
                                Đăng nhập vào Bonik.
                            </h2>
                            <!-- <div class="action-to-register mt-2">
                                <span>
                                    Don’t have an account?
                                </span>
                                <router-link to="" class='ms-1'>
                                    Create a free account
                                </router-link>
                            </div> -->
                        </div>
                        <div class="login-social mt-5 row">
                            <div class="col-4">
                                <div class="option-item">
                                    <img src="https://shofy-angular.vercel.app/assets/img/icon/login/google.svg" alt="" />
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="option-item">
                                    <img src="https://shofy-angular.vercel.app/assets/img/icon/login/facebook.svg" alt="" />
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="option-item">
                                    <img src="https://shofy-angular.vercel.app/assets/img/icon/login/apple.svg" alt="" />
                                </div>
                            </div>

                        </div>

                        <!-- <div class="text-center-auth mt-5 row align-items-center">
                            <hr class='col-2 col-md-3 col-lg-4' />
                            <p class='col-8 col-md-6 col-lg-4 text-center'>
                                or Sign in with Email
                            </p>
                            <hr class='col-2 col-md-3 col-lg-4'/>
                        </div> -->

                        <div class="form-input mt-5">
                            <div class="input w-100">
                              <v-text-field
                                label="Email"
                                outlined
                                placeholder="Nhập email của bạn"
                                v-model="email"
                              ></v-text-field>
                                <!-- onChange={(e)=>{setEmail(e.target.value)}}  -->
                            </div>
                            <div class="input mt-4 w-100">
                              <v-text-field
                                label="Mật khẩu"
                                filled
                                placeholder="Nhập email của bạn"
                                type="password"
                                v-model="password"
                              ></v-text-field>
                                <!-- onChange={(e)=>{setPass(e.target.value)}}  -->
                            </div>
                            <div class="btn-submit mt-4">
                                <button @click="handleLogin()" class='btn rounded-0'>
                                    Đăng nhập
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
