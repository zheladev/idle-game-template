import { Ref, ref } from "vue";
import { defineStore } from "pinia";
import Decimal, { DecimalSource } from "break_infinity.js";
import { STORE_NAMES } from ".";

interface Currencies {
    gold: Decimal
}

export const useCurrencyStore = defineStore(STORE_NAMES.CURRENCY_STORE, () => {
    const currencies: Ref<Currencies> = ref({
        gold: new Decimal(0),
    });

    return {
        name: STORE_NAMES.CURRENCY_STORE,
        currencies
    }
});
