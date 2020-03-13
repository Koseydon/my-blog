<template>
    <v-dialog max-width='600px' v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn text small rounded class="me-3" v-on="on" color="grey">Add a new todo</v-btn>
        </template>
        <v-card>
            <v-row justify="center">
                <v-card-title>
                    <h2 align>Add a new todo</h2>
                </v-card-title>
            </v-row>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label='Title' v-model="title" prepend-icon='mdi-folder' :rules='inputRules'>
                    </v-text-field>
                    <v-textarea label='Information' v-model="content" prepend-icon='mdi-pencil' :rules='inputRules'>
                    </v-textarea>
                    <v-menu max-width="290">
                        <template v-slot:activator="{ on }">
                            <v-text-field :value='formatedDate' v-on="on" label='Due date' prepend-icon='mdi-calendar'
                                :rules='inputRules'></v-text-field>
                        </template>
                        <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-select chips :items="items" label="Status" prepend-icon='mdi-check' v-model="status" :rules='inputRules'></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select chips :items="people" label="Person" prepend-icon='mdi-account' v-model="person" :rules='inputRules'></v-select>
                        </v-col>
                    </v-row>
                        <v-spacer></v-spacer>
                        <v-btn text class="success mx-0 mt-3" @click="submit" :loading='loading'>Add todo</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    // import format from 'date-fns/format'
    // import parseISO from 'date-fns/parseISO'

    export default {
        data() {
            return {
                title: '',
                content: '',
                due: null,
                inputRules: [
                    v => v.length >= 3 || 'Minimum length is 3 characters'
                ],
                loading: false,
                dialog: false,
                items: ['ongoing', 'complete', 'overdue'],
                status: '',
                people: ['The Net Ninja', 'Ryu', 'Chun Li', 'Gouken', 'Yoshi'],
                person: ''
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    this.loading = true;
                    const data = {
                        title: this.title,
                        content: this.content,
                        due: this.due,
                        status: this.status,
                        person: this.person
                    };
                    this.$http.post("http://localhost:3000/add", data).then(() => {
                        this.loading = false;
                        this.dialog = false;
                        this.$emit('projectAdded')
                    });

                }
            }
        },
        computed: {
            // formatedDate() {
            //     return this.due ? format(parseISO(this.due), 'do MMM yyyy') : ''
            // }
        }
    }
</script>