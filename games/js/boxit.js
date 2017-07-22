var app = angular.module('app', []);
app.controller('appController', ['$scope', '$timeout', ($scope, $timeout) => {
    // let sources = grades;
    let sources = JSON.parse(JSON.stringify(grades));
	$scope.data = {
        grade: 1,
        xMax: sources.grade1.defaultTable.length,
        yMax: sources.grade1.defaultTable[0].length,
        // 0: empty, 1: wall, 2: empty backgroud, 3: target, 4: empty box, 5: reach
        gradeTable: sources.grade1.defaultTable,
        protagonist: sources.grade1.protagonist,
        nowCount: 0,
        stepCount: 0,
	}

	$scope.keyEvent = (e) => {
		if(!e || e.keyCode!=37 && e.keyCode!=38 && e.keyCode!=39 && e.keyCode!=40 && e.keyCode!=65 && e.keyCode!=68 && e.keyCode!=83 && e.keyCode!=87) return;
		// console.log(e.keyCode)
        $scope.data.stepCount+=1;   
        switch (e.keyCode) {
            case 37: 
            case 65: 
                // console.log("left")
                if($scope.data.protagonist.x==0 || $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-1]==1) break;
                if($scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-1]==4) {
                    // console.log("左侧有空箱子");

                    if( $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-2]==4 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-2]==5 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-2]==1) {
                        // console.log("空箱子前面有障碍");
                        break;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-2]==2) {
                        // console.log("空箱子往左移一格");
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-1] = 2;
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-2] = 4;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-2]==3) {
                        // console.log("空箱子往左移一格 reach");
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-1] = 2;
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-2] = 5;
                    }
                }
                if($scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-1]==5) {
                    // console.log("左侧有reach箱子");
                    if( $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-2]==4 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-2]==5 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-2]==1) {
                        // console.log("reach箱子前面有障碍");
                        break;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-2]==2) {
                        // console.log("reach箱子往左移一格");
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-1] = 3;
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-2] = 4;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-2]==3) {
                        // console.log("reach箱子往左移一格 reach");
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-1] = 3;
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x-2] = 5;
                    }
                }
                $scope.data.protagonist.x -= 1;
                break;
            case 38:
            case 87:
                // console.log("top")
                if($scope.data.protagonist.y==0 || $scope.data.gradeTable[$scope.data.protagonist.y-1][$scope.data.protagonist.x]==1) break;
                if($scope.data.gradeTable[$scope.data.protagonist.y-1][$scope.data.protagonist.x] == 4) {
                    // console.log("上面有空箱子");

                    if( $scope.data.gradeTable[$scope.data.protagonist.y-2][$scope.data.protagonist.x]==4 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y-2][$scope.data.protagonist.x]==5 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y-2][$scope.data.protagonist.x]==1) {
                        // console.log("空箱子前面有障碍");
                        break;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y-2][$scope.data.protagonist.x]==2) {
                        // console.log("空箱子往上移一格");
                        $scope.data.gradeTable[$scope.data.protagonist.y-1][$scope.data.protagonist.x] = 2;
                        $scope.data.gradeTable[$scope.data.protagonist.y-2][$scope.data.protagonist.x] = 4;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y-2][$scope.data.protagonist.x]==3) {
                        // console.log("空箱子往上移一格 reach");
                        $scope.data.gradeTable[$scope.data.protagonist.y-1][$scope.data.protagonist.x] = 2;
                        $scope.data.gradeTable[$scope.data.protagonist.y-2][$scope.data.protagonist.x] = 5;
                    }
                }
                if( $scope.data.gradeTable[$scope.data.protagonist.y-1][$scope.data.protagonist.x] == 5) {
                    // console.log("上面有reach箱子");

                    if( $scope.data.gradeTable[$scope.data.protagonist.y-2][$scope.data.protagonist.x]==4 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y-2][$scope.data.protagonist.x]==5 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y-2][$scope.data.protagonist.x]==1) {
                        // console.log("空箱子前面有障碍");
                        break;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y-2][$scope.data.protagonist.x]==2) {
                        // console.log("reach箱子往上移一格");
                        $scope.data.gradeTable[$scope.data.protagonist.y-1][$scope.data.protagonist.x] = 3;
                        $scope.data.gradeTable[$scope.data.protagonist.y-2][$scope.data.protagonist.x] = 4;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y-2][$scope.data.protagonist.x]==3) {
                        // console.log("reach箱子往上移一格 reach");
                        $scope.data.gradeTable[$scope.data.protagonist.y-1][$scope.data.protagonist.x] = 3;
                        $scope.data.gradeTable[$scope.data.protagonist.y-2][$scope.data.protagonist.x] = 5;
                    }
                }
                $scope.data.protagonist.y -= 1;
                break;
            case 39:
            case 68:
                // console.log("right")
                if($scope.data.protagonist.x==($scope.data.xMax-1) || $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+1]==1) break;
                if($scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+1] == 4) {
                    // console.log("右面有空箱子");

                    if( $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+2]==4 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+2]==5 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+2]==1) {
                        // console.log("空箱子前面有障碍");
                        break;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+2]==2) {
                        // console.log("空箱子往右移一格");
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+1] = 2;
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+2] = 4;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+2]==3) {
                        // console.log("空箱子往右移一格 reach");
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+1] = 2;
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+2] = 5;
                    }
                }
                if( $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+1] == 5) {
                    // console.log("右面有reach箱子");

                    if( $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+2]==4 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+2]==5 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+2]==1) {
                        // console.log("空箱子前面有障碍");
                        break;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+2]==2) {
                        // console.log("reach箱子往右移一格");
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+1] = 3;
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+2] = 4;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+2]==3) {
                        // console.log("reach箱子往右移一格 reach");
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+1] = 3;
                        $scope.data.gradeTable[$scope.data.protagonist.y][$scope.data.protagonist.x+2] = 5;
                    }
                }
                $scope.data.protagonist.x += 1;
                break;
            case 40:
            case 83:
                // console.log("bottom")
                if($scope.data.protagonist.y==($scope.data.yMax-1) || $scope.data.gradeTable[$scope.data.protagonist.y+1][$scope.data.protagonist.x]==1) break;
                if($scope.data.gradeTable[$scope.data.protagonist.y+1][$scope.data.protagonist.x]==4) {
                    // console.log("下面有空箱子");

                    if( $scope.data.gradeTable[$scope.data.protagonist.y+2][$scope.data.protagonist.x]==4 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y+2][$scope.data.protagonist.x]==5 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y+2][$scope.data.protagonist.x]==1) {
                        // console.log("空箱子前面有障碍");
                        break;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y+2][$scope.data.protagonist.x]==2) {
                        // console.log("空箱子往下移一格");
                        $scope.data.gradeTable[$scope.data.protagonist.y+1][$scope.data.protagonist.x] = 2;
                        $scope.data.gradeTable[$scope.data.protagonist.y+2][$scope.data.protagonist.x] = 4;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y+2][$scope.data.protagonist.x]==3) {
                        // console.log("空箱子往下移一格 reach");
                        $scope.data.gradeTable[$scope.data.protagonist.y+1][$scope.data.protagonist.x] = 2;
                        $scope.data.gradeTable[$scope.data.protagonist.y+2][$scope.data.protagonist.x] = 5;
                    }
                }
                if($scope.data.gradeTable[$scope.data.protagonist.y+1][$scope.data.protagonist.x]==5) {
                    // console.log("下侧有reach箱子");
                    if( $scope.data.gradeTable[$scope.data.protagonist.y+2][$scope.data.protagonist.x]==4 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y+2][$scope.data.protagonist.x]==5 ||
                        $scope.data.gradeTable[$scope.data.protagonist.y+2][$scope.data.protagonist.x]==1) {
                        // console.log("reach箱子前面有障碍");
                        break;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y+2][$scope.data.protagonist.x]==2) {
                        // console.log("reach箱子往下移一格");
                        $scope.data.gradeTable[$scope.data.protagonist.y+1][$scope.data.protagonist.x] = 3;
                        $scope.data.gradeTable[$scope.data.protagonist.y+2][$scope.data.protagonist.x] = 4;
                    }
                    if( $scope.data.gradeTable[$scope.data.protagonist.y+2][$scope.data.protagonist.x]==3) {
                        // console.log("reach箱子往下移一格 reach");
                        $scope.data.gradeTable[$scope.data.protagonist.y+1][$scope.data.protagonist.x] = 3;
                        $scope.data.gradeTable[$scope.data.protagonist.y+2][$scope.data.protagonist.x] = 5;
                    }
                }
                $scope.data.protagonist.y += 1;
                break;

        }
        $timeout(() => {
            $scope.checkPass();
        })
	}

    $scope.checkPass = () => {
        var tempGradeName = "grade" + $scope.data.grade;
        $scope.data.nowCount = document.querySelectorAll(".reach").length;

        if($scope.data.nowCount == sources[tempGradeName].passCount) {
            if($scope.data.grade == Object.getOwnPropertyNames(sources).length) {
                alert("恭喜你通关了!")
                return;
            }
            $scope.data.grade += 1;
            tempGradeName = "grade" + $scope.data.grade;
            $scope.data = {
                grade: $scope.data.grade,
                xMax: sources[tempGradeName].defaultTable.length,
                yMax: sources[tempGradeName].defaultTable[0].length,
                gradeTable: sources[tempGradeName].defaultTable,
                protagonist: sources[tempGradeName].protagonist,
                nowCount: 0,
                stepCount: $scope.data.stepCount,
            }
        }
    }

    $scope.reset = () => {
        var tempGradeName = "grade" + $scope.data.grade;
        let sources = JSON.parse(JSON.stringify(grades));
        $scope.data = {
            grade: $scope.data.grade,
            xMax: sources[tempGradeName].defaultTable.length,
            yMax: sources[tempGradeName].defaultTable[0].length,
            gradeTable: sources[tempGradeName].defaultTable,
            protagonist: sources[tempGradeName].protagonist,
            nowCount: 0,
            stepCount: $scope.data.stepCount,
        }
    }
}]);
