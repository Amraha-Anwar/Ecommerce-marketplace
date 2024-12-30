export default {
    name: 'button',
    type: 'document',
    title: 'Button',
    fields: [
        {
            name: "label",  // the text displayed on the button
            title: "Button Text",
            type: "string"
        },
        {
            name: "url",         // the URL the button links to
            title: "Cart Page URL",  
            type: "url"
        },{
            name: "action",      // the action the button performs
            title: "Button Action",
            type: "string",
        },
        {
            name: "style",       // the style of the button
            title: "Button Style",
            type: "string",
            options: {
                list: [
                    {title: 'Primary', value: 'primary'},
                    {title: 'Secondary', value: 'secondary'},
                    {title: 'Link', value: 'link'},
                ]
            }
        }
    ]
}