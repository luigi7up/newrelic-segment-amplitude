<template>
        


    <n-auto-complete class="header-search"
        :input-props="{ autocomplete: 'disabled' }"
        :options="options"
        v-model:value="value"
        :on-focus="handleSearch"
        :on-select="handleSearch"
        placeholder="Search sections, alerts, dashboards, tags..."
    >

        <template #prefix>
            <n-icon>
            <search-outline />
            </n-icon>
        </template>
    </n-auto-complete>



</template>

<script>

    //Section, Dashboard, Service, Tag
    import { defineComponent, ref, computed, h, inject } from "vue";
    import {useRouter} from 'vue-router'
    import { NTag } from "naive-ui";
    import { SearchOutline  } from '@vicons/ionicons5'

    export default defineComponent({
    components: {
        SearchOutline
    },
    setup() {
        const valueRef = ref('')
        const router = useRouter()
        const eventsNotification = inject('eventsNotification');

        const handleSearch = (e)=>{

            let analyticsProps = {pathName: router.currentRoute.value.name,  path: router.currentRoute.value.path}
            
            if(e.type=="focus"){
                console.log("Focused the Search")
                window.analytics.track('Focused The Search', analyticsProps)
                eventsNotification(`Event "Focused The Search"`, "Track: Focused The Search", "Segment.js logged an analytics.track(), event that will show up in Amplitude as Focused The Search with these properties: "+ JSON.stringify(analyticsProps))
            }else{
                console.log("Search performed: "+e)
                analyticsProps = Object.assign(analyticsProps, {search_term: e});
                window.analytics.track('User Performed Search', analyticsProps)
                eventsNotification(`Event "User Performed Search"`, "Track: User Performed Search", "Segment.js logged an analytics.track(), event that will show up in Amplitude as User Performed Search with these properties: "+ JSON.stringify(analyticsProps))
                
            }
            console.dir(analyticsProps)
        }
        
        return {

            handleSearch,
            value: valueRef,
            options: computed(() => {

                const optionsToReturn = [
                    ['Services', ''],
                    ['Dashboards', ''],
                    ['Section', ''] ]

                
                console.log("Autocomplete: "+valueRef.value)
                return optionsToReturn
                .map((option) => {
                    return {
                        type: 'group',
                        label: option[0],
                        key: option[0],
                        children: [valueRef.value.split('@')[0] + option[1]]
                    }
                })
            })



        }
    }
    });
</script>


<style lang="scss">
    
</style>