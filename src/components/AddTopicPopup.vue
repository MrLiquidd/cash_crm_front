<template>
  <v-dialog v-model="dialog" width="1200">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        size="small"
        color="deep-purple-lighten-1"
        text="Топик"
        variant="flat"
      ></v-btn>
    </template>
    <AddTopicCard />
  </v-dialog>
</template>

<script>
import AddTopicCard from "@/components/AddTopicCard.vue";
export default {
  components: {
    AddTopicCard,
  },
  data: () => ({
    dialog: false,
    status: [
      "Не начато",
      "В работе",
      "Требует внимания",
      "Обсуждение",
      "Выполнено",
      "Просрочено",
    ],
  }),
  methods: {
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>
