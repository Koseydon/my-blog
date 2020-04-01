<template>
    <v-content>
        <v-img width="500px" height="200px" color="grey" tile class="mx-auto mt-12"
            src="http://localhost:3000/logos/MoB-logo.png"></v-img>
        <v-container>
            <v-card>
                <v-row justify="center">
                    <v-card-title>
                        <h2 align>Add a new blog post</h2>
                    </v-card-title>
                </v-row>
                <v-card-text>
                    <v-form class="px-3" ref="form">
                        <v-text-field label='Title' v-model="title" prepend-icon='mdi-folder' :rules='inputRules'>
                        </v-text-field>
                        <v-text-field label='Subtitle' v-model="subtitle" prepend-icon='mdi-folder' :rules='inputRules'>
                        </v-text-field>
                        <v-file-input label="Image" v-model="uploadImage" accept="image/*">
                        </v-file-input>
                        <v-textarea label='Content' v-model="text" prepend-icon='mdi-pencil' :rules='inputRules'>
                        </v-textarea>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-select @change="selectImage(category)" chips :items="categories" label="Category"
                                    prepend-icon='mdi-check' v-model="category" :rules='inputRules'></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select @change="selectAvatar(author)" chips :items="authors" label="Author"
                                    prepend-icon='mdi-account' v-model="author" :rules='inputRules'></v-select>
                            </v-col>
                        </v-row>
                        <v-spacer></v-spacer>
                        <v-btn text class="success mx-0 mt-3" @click="submit" :loading='loading'>Add blog post</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </v-content>
</template>

<script>
    import Endpoints from '../../data/Endpoints'
    import UserInfos from '../../data/UserInfos'

    export default {
        data() {
            return {
                title: '',
                subtitle: '',
                uploadImage: '',
                defaultImage: '',
                image: '',
                text: '',
                author: '',
                avatar: '',
                category: '',
                categories: Object.keys(UserInfos.categories),
                authors: Object.keys(UserInfos.authors),
                inputRules: [
                    v => v.length >= 3 || 'Minimum length is 3 characters'
                ],
                loading: false,
            }
        },
        methods: {
            selectAvatar(author) {
                this.avatar = UserInfos.authors[author]
            },
            selectImage(category) {
                this.defaultImage = UserInfos.categories[category]
            },
            async submit() {
                if (this.$refs.form.validate()) {
                    this.loading = true;

                    if (this.uploadImage === '') {
                        this.image = this.defaultImage
                    } else {
                        const formData = new FormData();
                        formData.append('image', this.uploadImage);

                        let imagePostResponse = await this.$http.post(Endpoints.blogImagePost,
                            formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    'token': localStorage.getItem('token')
                                }
                            })
                        this.image = imagePostResponse.body.fileUrl
                    }

                    const data = {
                        title: this.title,
                        subtitle: this.subtitle,
                        text: this.text,
                        category: this.category,
                        author: this.author,
                        avatar: this.avatar,
                        image: this.image
                    };

                    await this.$http.post(Endpoints.blogItemPost, data, {
                        headers: {
                            'token': localStorage.getItem('token')
                        }
                    })

                    this.loading = false;
                }
            }
        },
        async created() {
            try {
                await this.$http.get(Endpoints.validateToken, {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                });
            } catch (err) {
                window.location.href = '/'
            }
        },
    }
</script>