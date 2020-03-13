<template>
    <div class="text-center">
        <v-dialog max-width='500px' v-model="dialog">

            <template v-slot:activator="{ on }">
                <v-btn v-on="on" fab dark small text color="green">
                    <v-icon>mdi-account-plus</v-icon>
                </v-btn>
            </template>
            <v-card outlined>
                <v-toolbar dark flat>
                    <v-toolbar-title>Sign Up</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-text-field label="Full Name" name="name" prepend-icon="mdi-account" type="text"
                            v-model="email" class="my-input" @keydown.space.prevent @keydown.enter.native='submitEnter'
                            @paste.prevent :rules="[rules.required]"/>
                        <v-text-field label="E-mail" name="E-mail" prepend-icon="mdi-email" type="email" v-model="email"
                            class="my-input" @keydown.space.prevent @keydown.enter.native='submitEnter' @paste.prevent 
                            :rules="[rules.required, rules.email]"/>
                        <v-text-field id="password" label="Password" name="password" prepend-icon="mdi-lock"
                            type="password" v-model="password" @keydown.enter.native='submitEnter' 
                            :rules="[rules.required, rules.counterMin, rules.counterMax]"/>
                        <!-- <v-text-field id="password" label="Confirm Password" name="password" prepend-icon="mdi-lock"
                            type="password" v-model="password" @keydown.enter.native='submitEnter' :rules="[rules.required]"/> -->
                    </v-form>
                </v-card-text>
                <!-- <v-row justify="end" class="me-4 pb-5">
                    <vue-recaptcha ref="recaptcha" @verify="onVerify" sitekey="6LdcuNAUAAAAADZkzFttjkrbqd1ZjyFvbBlvEcnR"
                        :loadRecaptchaScript="true"></vue-recaptcha>
                </v-row> -->
                <v-card-actions>
                    <v-spacer />
                    <v-btn :disabled="!valid" @click="submit" color="primary">Signup</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                valid: true,
                rules: {
                    required: value => !!value || 'Required.',
                    counterMin: value => {
                        const pattern =
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
                        return pattern.test(value) ||
                            'Password should be min 8 characters and must inclune 1 capital letter, 1 number and 1 special character.'
                    },
                    counterMax: value => value.length <= 20 || 'Max 20 characters',
                    email: value => {
                        const pattern =
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    },
                }
            }
        },
        methods: {

        },
        created() {

        }
    }
</script>