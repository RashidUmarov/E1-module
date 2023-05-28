const left_editor = document.getElementById("left_html");
let left_html=left_editor.value;
const right_editor = document.getElementById("right_html");
let right_html=right_editor.value;
// списки найденных src в img
let left_list=[];
let right_list=[];


const result_text=document.getElementById("check");
const result_block=document.getElementById("replace-block");


// ищем кнопку LOOK FOR IMG
const look_img=document.getElementById("look-img");
//console.log("button look_img = ", look_img);
if (look_img != undefined ){
    look_img.onclick=searchImgSrc;
}
else{
    console.log("Error! button look_img not found");
};

// ищем кнопку Replace SRC
const replace_src=document.getElementById("btn-replace");
console.log("button replace_src = ", replace_src);


//const clean_block=document.getElementById("clean-block");
//
//console.log(left_editor);
//console.log(right_editor);
//console.log(result_text);

// читаем html текст из textarea и подсчитываем количество src в тегах img
function getHtmlText(textarea_node, src_list) {
    text=textarea_node.value;

    const parser= new DOMParser();
    const htmlDOM=parser.parseFromString(text,"text/html");
    console.log("htmlDOM => ",htmlDOM);
    let src;

    const allElements = htmlDOM.getElementsByTagName('IMG');
    let img_counter=0;
    for (const element of allElements) {
      img_counter++;
      //console.log(element);
      const attrs = element.getAttributeNames();
      //console.log(attrs);
      for (let ind in attrs){
//         console.log(`${ind}  --->  ${attrs[ind]}`);
         let attr_name=attrs[ind];
         if (attr_name==='src'){
//            console.log(`  ${img_counter}. src= ${src}:  attr_name=${attr_name}`)
            src=element.getAttribute('src');
            src_list.push(src)
         }
      }
    }
    //console.log("links list:",src_list);
}

// ищет все src в тегах DIV на обоих панелях
function searchImgSrc(){
    left_list=[];
    right_list=[];
    getHtmlText(left_editor, left_list);
    console.log("left list:",left_list);
    console.log("------------------");
    getHtmlText(right_editor, right_list);
    console.log("right list:",right_list);
    let answer="";
    if (left_list.length>0){
        let size=Math.min(left_list.length, right_list.length);
        if (size==0){
            answer="Right text no links";
            console.log(answer);
        } else{
            answer=`We have ${size} links to replace`;
            console.log(answer);
            answer+="<ol>";
            for (let i in left_list){
            answer+=("<li>"  + left_list[i].slice(5, 40)+"...<br>"+right_list[i].slice(5, 40)+ "...</li>");
            console.log(left_list[i]);
            }
            answer+="</ol>"

            result_text.innerHTML=answer;
            result_text.style.setProperty("display", 'block');
            result_block.style.setProperty("display", 'block');
        }
    }
}


function repalceSrcInImg(){
    if (left_list.length>0){
        let size=Math.min(left_list.length, right_list.length);
    }
    text=right_editor.value;
    if (text.length==0){
        console.log('right panel is empty');
        return;
    }
    const parser= new DOMParser();
    const htmlDOM=parser.parseFromString(text,"text/html");
    console.log("htmlDOM => ",htmlDOM);
    let src;

    const allElements = htmlDOM.getElementsByTagName('IMG');
    let img_counter=0;
    for (const element of allElements) {
      const attrs = element.getAttributeNames();
      for (let ind in attrs){
         let attr_name=attrs[ind];
         if (attr_name==='src'){
//            console.log(`  ${img_counter}. src= ${src}:  attr_name=${attr_name}`)
            let left=left_list[img_counter];
            let right=element.getAttribute('src');
            if(left != right){
                element.setAttribute('src',left_list[img_counter]);
                console.log(`replace ${right}  -> ${left}`);
            }
         }
      }
      img_counter++;
    }
    right_editor.value=htmlDOM.body.innerHTML;
}