function handler(output)
{
    output = output.split('\n')
    console.log("bellow");
    console.log(output);
    output = Object.entries(output)
    output = output[1]
    output = output[1]
    splitString = output.substring(0,7)
    output = output.split(splitString)[1]
    output = output.slice(0, output.indexOf('ystemctl'))
    output = output.split('  ')
    return Object.values(output)
}

module.exports = {handler}