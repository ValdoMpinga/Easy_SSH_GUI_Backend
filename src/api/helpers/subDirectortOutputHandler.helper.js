function handler(output)
{
    output = output.split('\n')
    output = Object.entries(output)
    output = output[2]
    output = output[1]
    console.log("bellow");
    console.log(output);
    splitString = output.substring(0, 7)
    output = output.split(splitString)[1]
    output = output.slice(0, output.indexOf('ystemctl'))
    output = output.split('  ')
    return Object.values(output)
}

module.exports = { handler }
