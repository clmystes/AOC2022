package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"sort"
	"strconv"
	"strings"
)

type CaloriesList = [][]int

// go run ./main.go -file='input.txt'
func main() {
	filePath := flag.String("file", "", "path to your input")

	flag.Parse()

	if *filePath == "" {
		fmt.Println("Please provide your input")
		return
	}

	b, err := ioutil.ReadFile(*filePath)

	if err != nil {
		fmt.Println(err)
		return
	}

	s := string(b)

	part1(s)

	fmt.Println()

	part2(s)
}

func parseInput(input string) CaloriesList {
	result := CaloriesList{}

	for _, calories := range strings.Split(input, "\n\n") {

		itemsStr := strings.Split(calories, "\n")
		items := []int{}

		for _, itemStr := range itemsStr {
			itemInt, _ := strconv.Atoi(itemStr)
			items = append(items, itemInt)
		}

		result = append(result, items)
	}

	return result
}

func sortCalories(c CaloriesList) []int {
	list := []int{}

	for _, calories := range c {
		curSum := 0

		for _, c := range calories {
			curSum += c
		}

		list = append(list, curSum)
	}

	sort.Ints(list)
	return list
}

func part1(input string) {
	parsed := parseInput(input)

	sorted := sortCalories(parsed)

	fmt.Printf("Part1 answer is: %d", sorted[len(sorted)-1])
}

func part2(input string) {
	parsed := parseInput(input)

	sorted := sortCalories(parsed)
	l := len(sorted)

	fmt.Printf("Part2 answer is: %d", sorted[l-1]+sorted[l-2]+sorted[l-3])
}
