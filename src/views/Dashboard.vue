<template>
  <div class="dashboard">
    <div class="container">
      <h1 class="title is-4">Seu Gerenciador de Contatos</h1>

      <b-button
        class="is-success is-medium"
        label="+"
        type="is-primary"
        size="is-medium"
        @click="showContactAddModal = true"
        data-testId="add_contact_button"
      />

      <div class="columns is-multiline" data-testId="contact_card">
        <div
          class="column is-4"
          v-for="contact in contactList"
          :key="contact.id"
        >
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="../assets/whatsapp.svg" alt="Logo WhatasApp" />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4" :data-testId="`contact_card_name_${ contact.name }`">{{ contact.name }}</p>
                  <p class="subtitle is-6" :data-testId="`contact_card_number_${contact.number}`">{{ contact.number }}</p>
                </div>
              </div>

              <div class="content" :data-testId="`contact_card_description_${contact.description}`">
                {{ contact.description }}
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Conversar</a>
              <a href="#" class="card-footer-item">Apagar</a>
            </footer>
          </div>
        </div>
      </div>

      <b-modal
        v-model="showContactAddModal"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Example Modal"
        aria-modal
      >
        <form action="">
          <div class="modal-card" style="width: 450px">
            <header class="modal-card-head">
              <p class="modal-card-title" data-testId="new_contact_form">Novo Contato</p>
              <button
                type="button"
                class="delete"
                @click="showContactAddModal = false"
              />
            </header>
            <section class="modal-card-body">
              <div class="field">
                <input
                  type="text"
                  class="input is-primary"
                  v-model="form.name"
                  placeholder="Nome Completo"
                  data-testId="form_name"
                />
                <small data-testId="name_error" class="has-text-danger" v-if="errorName === true">Nome é Obrigatório</small>
              </div>
              <div class="field">
                <input
                  type="text"
                  class="input is-primary"
                  v-model="form.number"
                  placeholder="WhatsApp"
                  data-testId="form_number"
                />
                <small data-testId="number_error" class="has-text-danger" v-if="errorNumber === true">Number é Obrigatório</small>
              </div>
              <div class="field">
                <textarea
                  type="textarea"
                  class="input is-primary"
                  v-model="form.description"
                  placeholder="Assunto"
                  data-testId="form_description"
                ></textarea>
                <small data-testId="description_error" class="has-text-danger" v-if="errorDescription === true"
                  >Assunto é Obrigatório</small
                >
              </div>
            </section>
            <footer class="modal-card-foot">
              <b-button
                label="Cadastrar"
                type="button"
                class="button is-success"
                @click="create"
                data-testId="form_btn_cadastrar"
              />
            </footer>
          </div>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>

export default {
  name: "Dashboard",
  data() {
    return {
      contactList: [],
      showContactAddModal: false,
      errorName: false,
      errorNumber: false,
      errorDescription: false,
      form: {
        name: "",
        number: "",
        description: "",
      },
    };
  },
  methods: {
    create() {
      this.errorName = false;
      this.errorNumber = false;
      this.errorDescription = false;

      if (this.form.name === "") {
        this.errorName = true;
      }

      if (this.form.number === "") {
        this.errorNumber = true;
      }

      if (this.form.description === "") {
        this.errorDescription = true;
      }

      if (
        this.errorName === false &&
        this.errorNumber === false &&
        this.errorDescription === false
      ) {
        window.axios.post("/contacts", this.form).then(async (res) => {
          await res.data;
          this.form.name = "";
          this.form.number = "";
          this.form.description = "";
          this.showContactAddModal = false;
          this.list();
        });
      }
    },

    list() {
      window.axios.get("/contacts").then(async (res) => {
        this.contactList = await res.data;
      });
    },
  },
  mounted() {
    this.list();
  },
};
</script>
