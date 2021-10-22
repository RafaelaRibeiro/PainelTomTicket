<template>
  <v-app>
    <!-- <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

    <v-main>
   <v-card flat>
       <!-- <v-card v-for="chamado in chamados" :key="chamado.idchamado">
      {{chamado.protocolo}}
        
    </v-card> -->

  <v-container>
       <v-row>
        <v-col>
          <h2 class="font-weight-regular pa-2">
           Chamados - Departamento de Tecnologia da Informação
          </h2>
        </v-col>
      </v-row>
    

      <v-simple-table  class="elevation-1">
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
        <tr
          v-for="i in filteredAtend"
          :key="i.idchamado"
        >
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
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'


export default {
  name: 'App',

  data: () => ({
     chamados:[],
     intervalData: null,
     departamentos:{
       
     }
    //
  }),


  computed:{
         filteredAtend() {
      

      const filter = this.chamados.filter((e) => {
        return e.atendente === null
      })
      return filter
    },
  },

    mounted() {
        
        this.intervalData = setInterval(this.getTickets, 15000)
        this.getTickets()
    },

     destroyed() {
    clearInterval(this.intervalData)
  },

  
    methods:{
        getTickets() {
        // const url = 'https://api.tomticket.com/chamados/42b37aec344d98888d2d58ee1a425558/1/?departament_id=4d49973cde1195ab7558f777670a1dc0&situacao=0'
        axios(`https://api.tomticket.com/chamados/${process.env.VUE_APP_SECRET_ACCESS_KEY}/1/?departament_id=${process.env.VUE_APP_SECRET_ACCESS_KEY_TI}&situacao=0,1,2,3`).then((res) =>{
            this.chamados = res.data.data
        })
        }
    },
 watch: {
        // chamados() {
           

        //      setInterval( this.getTickets(), 5000)
        // }
    },    

  

};
</script>
<style >
html {
  font-size: 18px;
}

tbody tr:nth-of-type(odd) {
  background-color: rgba(192, 192, 192, 0.6);
}
</style>
