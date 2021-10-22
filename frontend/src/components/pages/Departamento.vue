<template>
  <v-card flat>
    <v-container>
      <v-row>
        <v-col>
          <h2 class="font-weight-regular pa-2 mb-3">
            Departamentos
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-simple-table class="elevation-1">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Departamento
                </th>
                <th class="text-left">
                  Chave
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in departamentos" :key="i.id">
                <td>{{ i.nome }}</td>
                <td>{{ i.id }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Departamento",
  data: () => ({
    departamentos: {},
  }),

  methods: {
    getDepartaments() {
      axios(
        `https://api.tomticket.com/departamentos/${process.env.VUE_APP_SECRET_ACCESS_KEY}`
      ).then((res) => {
        this.departamentos = res.data.data;
      });
    },
  },
  mounted() {
    this.getDepartaments();
  },
};
</script>

<style></style>
