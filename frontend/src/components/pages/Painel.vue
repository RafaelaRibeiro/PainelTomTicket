<template>
  <v-card flat>
    <v-container>
      <v-row>
        <v-col>
          <h2 class="font-weight-regular pa-2 mb-3">
            Chamados - {{ filterDepartament.nome }}
          </h2>
        </v-col>
      </v-row>

      <v-simple-table class="elevation-1">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Protocolo
              </th>
              <th class="text-left">
                Titulo
              </th>
              <th class="text-left">
                Cliente
              </th>
              <th class="text-left">
                Data da Criação
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in filteredAtend" :key="i.idchamado">
              <td>{{ i.protocolo }}</td>
              <td>{{ i.titulo }}</td>
              <td>{{ i.nomecliente }}</td>
              <td>{{ i.data_criacao }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "Painel",

  data: () => ({
    chamados: [],
    intervalData: null,

    //
  }),

  computed: {
    filteredAtend() {
      const filter = this.chamados.filter((e) => {
        return e.atendente === null;
      });
      return filter;
    },

    filterDepartament() {
      let departamento = {};

      switch (this.$route.params.departamentId) {
        case "AT":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_AT;
          departamento.nome = "Área Técnica";
          break;
        case "TIC":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_TIC;
          departamento.nome = "Tecnologia da Informação";
          break;
        case "ATE":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_ATE;
          departamento.nome = "Atendimento";
          break;
        case "COM":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_COM;
          departamento.nome = "Comercial";
          break;
        case "SUP":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_SUP;
          departamento.nome = "Compras";
          break;
        case "FAT":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_FAT;
          departamento.nome = "Faturamento";
          break;
        case "FIN":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_FIN;
          departamento.nome = "Financeiro";
          break;
        case "MAN":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_MAN;
          departamento.nome = "Manutencao";
          break;
        case "MKT":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_MKT;
          departamento.nome = "Marketing";
          break;
        case "RH":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_RH;
          departamento.nome = "Recursos Humanos";
          break;
        case "ST":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_ST;
          departamento.nome = "Segurança do Trabalho";
          break;
        case "SG":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_SG;
          departamento.nome = "Sigla";
          break;
        case "TRA":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_TRA;
          departamento.nome = "Transporte";
          break;
        case "TRI":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_TRI;
          departamento.nome = "Triagem";
          break;
        case "VAC":
          departamento.chave = process.env.VUE_APP_SECRET_ACCESS_KEY_VAC;
          departamento.nome = "Vacinas";
          break;
        default:
          departamento.chave = "Sem departamento";
          departamento.nome = "Sem departamento";
      }

      return departamento;
    },
  },

  mounted() {
    this.intervalData = setInterval(this.getTickets, 15000);
    this.getTickets();
  },

  destroyed() {
    clearInterval(this.intervalData);
  },

  methods: {
    getTickets() {
      // const url = 'https://api.tomticket.com/chamados/42b37aec344d98888d2d58ee1a425558/1/?departament_id=4d49973cde1195ab7558f777670a1dc0&situacao=0'
      axios(
        `https://api.tomticket.com/chamados/${process.env.VUE_APP_SECRET_ACCESS_KEY}/1/?departament_id=${this.filterDepartament.chave}&situacao=0,1,2,3`
      ).then((res) => {
        this.chamados = res.data.data;
      });
    },
  },
};
</script>
<style>
html {
  font-size: 18px;
}

tbody tr:nth-of-type(odd) {
  background-color: rgba(192, 192, 192, 0.6);
}
</style>
