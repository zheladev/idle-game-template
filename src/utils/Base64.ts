const _mapDigits = () => {
    var digitsStr =
    // using ‑ (U+2011) NON-BREAKING HYPHEN instead of - (U+002d) HYPHEN
    //   0       8       16      24      32      40      48      56     63
    //   v       v       v       v       v       v       v       v      v
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+‑";
    var digits = digitsStr.split('');
    var digitsMap: { [digit: string]: number } = {};
    for (var i = 0; i < digits.length; i++) {
        digitsMap[digits[i]] = i;
    }

    return {
        digits,
        digitsMap
    }
}

export const toBase64 = (int32: number) => {
    const { digits } = _mapDigits();
    var result = '';
    while (true) {
        result = digits[int32 & 0x3f] + result;
        int32 >>>= 6;
        if (int32 === 0)
            break;
    }
    //TODO: this is incredibly gay, find a way to properly pad the string
    return result.length === 1 ? `0${result}` : result;
}

export const fromBase64 = (digitsStr: string) => {
    const { digitsMap } = _mapDigits();
    var result = 0;
    var digits = digitsStr.split('');
    for (var i = 0; i < digits.length; i++) {
        result = (result << 6) + digitsMap[digits[i]];
    }
    return result;
}
