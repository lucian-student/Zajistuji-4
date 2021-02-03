/*
ValidateTextInput zkontroluje jestli na konci a na zacatku neni mezera
ValidateUnneceserrySpaceUsage zkontroluje jestli se ne naduzivaji mezery
ValidateEmptiness zkontroluje jestli vstup je prazdny
isFileImage zkontroluje jestli soubor neni prazdny a jestli je obrazek
*/
export function ValidateTextInput(text) {
    if (text) {
        const splitedText = text.split('');
        if (splitedText[0] === ' ' || splitedText[splitedText.length - 1] === ' ') {
            return false
        } else {
            return true;
        }
    } else {
        return false;
    }
};


export function ValidateUnneceserrySpaceUsage(data) {

    const splitedString = data.split('');
    let valid = true;
    let count = 0;
    splitedString.forEach(element => {
        if (element === ' ') {
            count++;
        } else {
            count = 0;
        }
        if (count > 1) {
            valid = false;
        }
    });
    return valid;
};

export function ValidateEmptiness(data) {
    return String(data).trim().length > 0;
}

export function isFileImage(file,image) {
    if (image&&file[0]) {
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        return acceptedImageTypes.includes(file[0].type);
    }
    return true;
}