'use strict'

//Run this file as a script for my quick-n-dirty unit test

const assert = require('assert')

//Common
assert.equal(convertToneNumbersToAccents('a1a2a3a4a5'), 'āáǎàa')
assert.equal(convertToneNumbersToAccents('an1an2an3an4an5'), 'ānánǎnànan')
assert.equal(convertToneNumbersToAccents('ai1ai2ai3ai4ai5'), 'āiáiǎiàiai')
assert.equal(convertToneNumbersToAccents('ao1ao2ao3ao4ao5'), 'āoáoǎoàoao')
assert.equal(convertToneNumbersToAccents('ang1ang2ang3ang4ang5'), 'āngángǎngàngang')

assert.equal(convertToneNumbersToAccents('e1e2e3e4e5'), 'ēéěèe')
assert.equal(convertToneNumbersToAccents('er1er2er3er4er5'), 'ērérěrèrer')
assert.equal(convertToneNumbersToAccents('en1en2en3en4en5'), 'ēnéněnènen')
assert.equal(convertToneNumbersToAccents('ei1ei2ei3ei4ei5'), 'ēiéiěièiei')
assert.equal(convertToneNumbersToAccents('eng1eng2eng3eng4eng5'), 'ēngéngěngèngeng')

assert.equal(convertToneNumbersToAccents('i1i2i3i4i5'), 'īíǐìi')
assert.equal(convertToneNumbersToAccents('in1in2in3in4in5'), 'īnínǐnìnin')
assert.equal(convertToneNumbersToAccents('ing1ing2ing3ing4ing5'), 'īngíngǐngìnging')

assert.equal(convertToneNumbersToAccents('o1o2o3o4o5'), 'ōóǒòo')
assert.equal(convertToneNumbersToAccents('ou1ou2ou3ou4ou5'), 'ōuóuǒuòuou')
assert.equal(convertToneNumbersToAccents('ong1ong2ong3ong4ong5'), 'ōngóngǒngòngong')

assert.equal(convertToneNumbersToAccents('u1u2u3u4u5'), 'ūúǔùu')
assert.equal(convertToneNumbersToAccents('un1un2un3un4un5'), 'ūnúnǔnùnun')

//Not common
assert.equal(convertToneNumbersToAccents('r5'), 'r')
assert.equal(convertToneNumbersToAccents('xx5'), 'xx')
assert.equal(convertToneNumbersToAccents('E1'), 'Ē')
assert.equal(convertToneNumbersToAccents('E2'), 'É')
assert.equal(convertToneNumbersToAccents('E3'), 'Ě')
assert.equal(convertToneNumbersToAccents('E4'), 'È')
assert.equal(convertToneNumbersToAccents('E5'), 'E')
assert.equal(convertToneNumbersToAccents('Er1'), 'Ēr')
assert.equal(convertToneNumbersToAccents('Er2'), 'Ér')
assert.equal(convertToneNumbersToAccents('Er3'), 'Ěr')
assert.equal(convertToneNumbersToAccents('Er4'), 'Èr')
assert.equal(convertToneNumbersToAccents('Er5'), 'Er')
assert.equal(convertToneNumbersToAccents('A1'), 'Ā')
assert.equal(convertToneNumbersToAccents('A2'), 'Á')
assert.equal(convertToneNumbersToAccents('A3'), 'Ǎ')
assert.equal(convertToneNumbersToAccents('A4'), 'À')
assert.equal(convertToneNumbersToAccents('A5'), 'A')
assert.equal(convertToneNumbersToAccents('u:1'), 'ǖ')
assert.equal(convertToneNumbersToAccents('u:2'), 'ǘ')
assert.equal(convertToneNumbersToAccents('u:3'), 'ǚ')
assert.equal(convertToneNumbersToAccents('u:4'), 'ǜ')
assert.equal(convertToneNumbersToAccents('u:5'), 'ü')
assert.equal(convertToneNumbersToAccents('u:5'), 'ü')
assert.equal(convertToneNumbersToAccents('An1'), 'Ān')
assert.equal(convertToneNumbersToAccents('An2'), 'Án')
assert.equal(convertToneNumbersToAccents('An3'), 'Ǎn')
assert.equal(convertToneNumbersToAccents('An4'), 'Àn')
assert.equal(convertToneNumbersToAccents('An5'), 'An')
assert.equal(convertToneNumbersToAccents('Ang1'), 'Āng')
assert.equal(convertToneNumbersToAccents('Ang2'), 'Áng')
assert.equal(convertToneNumbersToAccents('Ang3'), 'Ǎng')
assert.equal(convertToneNumbersToAccents('Ang4'), 'Àng')
assert.equal(convertToneNumbersToAccents('Ang5'), 'Ang')
assert.equal(convertToneNumbersToAccents('m2'), 'm2') //not a typo
assert.equal(convertToneNumbersToAccents('m4'), 'm4') //not a typo


function convertToneNumbersToAccents(pinyin) {

    const common = {
        a1: 'ā',
        a2: 'á',
        a3: 'ǎ',
        a4: 'à',
        a5: 'a',
        ai1: 'āi',
        ai2: 'ái',
        ai3: 'ǎi',
        ai4: 'ài',
        ai5: 'ai',
        an1: 'ān',
        an2: 'án',
        an3: 'ǎn',
        an4: 'àn',
        an5: 'an',
        ao1: 'āo',
        ao2: 'áo',
        ao3: 'ǎo',
        ao4: 'ào',
        ao5: 'ao',
        ang1: 'āng',
        ang2: 'áng',
        ang3: 'ǎng',
        ang4: 'àng',
        ang5: 'ang',
        e1: 'ē',
        e2: 'é',
        e3: 'ě',
        e4: 'è',
        e5: 'e',
        er1: 'ēr',
        er2: 'ér',
        er3: 'ěr',
        er4: 'èr',
        er5: 'er',
        en1: 'ēn',
        en2: 'én',
        en3: 'ěn',
        en4: 'èn',
        en5: 'en',
        ei1: 'ēi',
        ei2: 'éi',
        ei3: 'ěi',
        ei4: 'èi',
        ei5: 'ei',
        eng1: 'ēng',
        eng2: 'éng',
        eng3: 'ěng',
        eng4: 'èng',
        eng5: 'eng',
        i1: 'ī',
        i2: 'í',
        i3: 'ǐ',
        i4: 'ì',
        i5: 'i',
        in1: 'īn',
        in2: 'ín',
        in3: 'ǐn',
        in4: 'ìn',
        in5: 'in',
        ing1: 'īng',
        ing2: 'íng',
        ing3: 'ǐng',
        ing4: 'ìng',
        ing5: 'ing',
        o1: 'ō',
        o2: 'ó',
        o3: 'ǒ',
        o4: 'ò',
        o5: 'o',
        ou1: 'ōu',
        ou2: 'óu',
        ou3: 'ǒu',
        ou4: 'òu',
        ou5: 'ou',
        ong1: 'ōng',
        ong2: 'óng',
        ong3: 'ǒng',
        ong4: 'òng',
        ong5: 'ong',
        u1: 'ū',
        u2: 'ú',
        u3: 'ǔ',
        u4: 'ù',
        u5: 'u',
        ü1: 'ǖ',
        ü2: 'ǘ',
        ü3: 'ǚ',
        ü4: 'ǜ',
        ü5: 'ü',
        uv: 'ǚ',
        un1: 'ūn',
        un2: 'ún',
        un3: 'ǔn',
        un4: 'ùn',
        un5: 'un'
    }

    const uncommon = {
        r5: 'r',
        xx5: 'xx',
        E1: 'Ē',
        E2: 'É',
        E3: 'Ě',
        E4: 'È',
        E5: 'E',
        Er1: 'Ēr',
        Er2: 'Ér',
        Er3: 'Ěr',
        Er4: 'Èr',
        Er5: 'Er',
        A1: 'Ā',
        A2: 'Á',
        A3: 'Ǎ',
        A4: 'À',
        A5: 'A',
        An1: 'Ān',
        An2: 'Án',
        An3: 'Ǎn',
        An4: 'Àn',
        An5: 'An',
        Ang1: 'Āng',
        Ang2: 'Áng',
        Ang3: 'Ǎng',
        Ang4: 'Àng',
        Ang5: 'Ang',
        'u:1': 'ǖ',
        'u:2': 'ǘ',
        'u:3': 'ǚ',
        'u:4': 'ǜ',
        'u:5': 'ü'
    }

    for (const key in common) {
        pinyin = pinyin.replace(new RegExp(key, 'g'), common[key])
    }

    for (const key in uncommon) {
        pinyin = pinyin.replace(new RegExp(key, 'g'), uncommon[key])
    }

    return pinyin
}

module.exports = {
    convertToneNumbersToAccents
}