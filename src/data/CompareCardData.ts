import VitaminContentResult from './VitaminContentResult';

type ContentRowValue = {
    name: string;
    value: string;
    result: VitaminContentResult
}

type ContentRow = {
    contentName: string;
    rowValue: ContentRowValue;
}

type CompareCardContent = {
    contentTitle: string;
    contentRow: ContentRowValue[];
}


type CompareCardData = {
    title?: string;
    content?: CompareCardContent[];
}


export default ContentRow;