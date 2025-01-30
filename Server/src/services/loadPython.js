// MetaCall imports
const { metacall, metacall_load_from_file } = require('metacall');
const path = require('path')

// Load Python script scraping.py
// metacall_load_from_file('py', ['../python/huggingface.py']);
metacall_load_from_file('py', [path.resolve('huggingface.py')]);

const summarize = async (data) => {
    const response = await metacall('get_model_response', data);
    return response;
}

module.exports = summarize; 