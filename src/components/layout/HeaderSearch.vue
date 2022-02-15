<template>
        


    <n-auto-complete class="header-search"
        :input-props="{ autocomplete: 'disabled' }"
        :options="options"
        v-model:value="value"
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
    import { defineComponent, ref, computed, h } from "vue";
    import { NTag } from "naive-ui";
    import { SearchOutline  } from '@vicons/ionicons5'

    export default defineComponent({
    components: {
        SearchOutline
    },
    setup() {
        const valueRef = ref('')
        
        return {

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