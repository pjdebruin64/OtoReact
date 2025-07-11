# SED script to minify the TypeScript compiler output

# Remove existing copyright notice
:x
/^\/\*.*\*\// d
/^\/\*/ {N ; bx}

# Insert copyright notice with date
x
s/.*/dir otoreact.ts/ ; e
s/^.*(..)-(..)-(....).*/\/* OtoReact version \3-\2-\1/ ; p
i\
* Copyright 2022-2025 Peter J. de Bruin (peter@peterdebruin.net)\
* SEE LICENSE IN README.md or https://otoreact.dev/download\
*/
x

: loop

# Remove CR's
s/\r//

# Merge lines ending in these characters (without semicolon) with next line, inserting a space
/[][,{}=:?()&|]$|else$/ {N ; s/\n */ / ; b loop }

# Merge line ending in backslash with next line, removing the backslash
/\\$/ {N ; s/\\\n// ; b loop }

# Remove semicolons at end of line
#s/;+$//

# Replace (...) => by ... =>
s/ ?\((\w+)\)\s*=>/ \1=>/g

# Remove whitespace before and after special chars, except inside all sorts of strings and regexps
s/ *(^|[-\[(),:;{}<>=?!+*|&]|]|`(\\.|\$\{(`[^`]*`|[^\}])\}|[^\`])*`|'(\\.|[^\'])*'|\"(\\.|[^\"])*\"|\/(\\.|[^\/])*\/) */\1/g

# Remove whitespace before and after special chars within expressions in interpolated strings
t repeat    # Needed to clear previous test result
: repeat
s/^(([^`]|`[^`]*`)*`[^`]*\$\{('(\\.|[^\'])*'|\"(\\.|[^\"])*\"|\{[^{}]*\}|[^{}])*)(([-+*/&|?:]) +| +([-+*/&|?:]))/\1\7\8/i
t repeat

# Remove semicolon before }
# s/;+([}])/\1/g

# Skip emptylines
/^;*$/{n;b loop} 

# Check next line
N
# If it starts with one of these chars, then merge without semicolons and loop
/\n\s*[\}\?:&|]/ { s/;*\n\s*// ; b loop }

# If it starts with ( or [ or class, then merge leaving a semicolon, to prevent unintentional function calls
/\n\s*([[(])/ { s/;\n\s*/;/ ; b loop }

# Remove semicolons at end of line
s/;+\n\s*/\n/

# Print up to newline, and restart with the remaining (next) line
P
s/^.*\n//
b loop