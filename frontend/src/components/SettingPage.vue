<template>
    <div>
        <v-container class="mt-16">
            <v-card>
                <v-list two-line v-for="(menu,i) in menuList" :key="i">
                    <v-list-item @click="$router.push('/')">
                        <v-list-item-avatar>
                            <v-icon class="darkgrey">{{menu.icon}}</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title class="subtitle-1">{{menu.title}}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon>
                                <v-icon color="darkgrey">mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'SettingPage',
    data: () =>({
        menuList:[
            {title:'Wi-Fi',
            icon:'mdi-wifi'},
            {title:'Bluetooth',
            icon:'mdi-bluetooth'},
            {title:'알림',
            icon:'mdi-bell-badge-outline'},
        ]
    })
}
</script>