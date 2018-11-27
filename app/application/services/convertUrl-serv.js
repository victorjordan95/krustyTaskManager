angular.module('ktm').service('ConvertUrlService', [function () {

    this.convertUrl = function (url) {
        var pathArray = url.split('/');
        var withoutSpace = pathArray[pathArray.length - 1].split("%20");
        var nameProject = "";
        withoutSpace.forEach(function (element) {
            element === withoutSpace[withoutSpace.length - 1] ? nameProject += `${element}` : nameProject += `${element} `;
        });

        var id = decodeURI(`${pathArray[2]}|${nameProject}`);

        return id
    }

}]);