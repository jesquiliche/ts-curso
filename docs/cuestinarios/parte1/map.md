---
sidebar_position: 6
---

import Quiz from '@site/src/components/Quiz';

# Map y Set en JavaScript

Aquí tienes un cuestionario sobre **Map y Set** en JavaScript. Responde las preguntas y verifica tus respuestas.

<Quiz questions={[
  {
    question: '¿Cómo se define un Map en JavaScript?',
    options: ['new Map()', '{}', '[]', 'Map()'],
    answer: 'new Map()'
  },
  {
    question: '¿Cómo se añade un par clave-valor a un Map?',
    options: ['map.add(key, value)', 'map.set(key, value)', 'map.put(key, value)', 'map.insert(key, value)'],
    answer: 'map.set(key, value)'
  },
  {
    question: '¿Cómo se obtiene el valor asociado a una clave en un Map?',
    options: ['map[key]', 'map.get(key)', 'map.value(key)', 'map.fetch(key)'],
    answer: 'map.get(key)'
  },
  {
    question: '¿Qué método se usa para comprobar si una clave existe en un Map?',
    options: ['map.hasKey(key)', 'map.exists(key)', 'map.has(key)', 'map.contains(key)'],
    answer: 'map.has(key)'
  },
  {
    question: '¿Cómo se elimina un par clave-valor de un Map?',
    options: ['map.remove(key)', 'map.delete(key)', 'map.del(key)', 'map.erase(key)'],
    answer: 'map.delete(key)'
  },
  {
    question: '¿Qué método se usa para eliminar todos los elementos de un Map?',
    options: ['map.clear()', 'map.reset()', 'map.empty()', 'map.removeAll()'],
    answer: 'map.clear()'
  },
  {
    question: '¿Cómo se define un Set en JavaScript?',
    options: ['new Set()', '{}', '[]', 'Set()'],
    answer: 'new Set()'
  },
  {
    question: '¿Cómo se añade un valor a un Set?',
    options: ['set.add(value)', 'set.set(value)', 'set.put(value)', 'set.insert(value)'],
    answer: 'set.add(value)'
  },
  {
    question: '¿Cómo se comprueba si un valor existe en un Set?',
    options: ['set.hasValue(value)', 'set.exists(value)', 'set.has(value)', 'set.contains(value)'],
    answer: 'set.has(value)'
  },
  {
    question: '¿Cómo se elimina un valor de un Set?',
    options: ['set.remove(value)', 'set.delete(value)', 'set.del(value)', 'set.erase(value)'],
    answer: 'set.delete(value)'
  },
  {
    question: '¿Qué método se usa para eliminar todos los valores de un Set?',
    options: ['set.clear()', 'set.reset()', 'set.empty()', 'set.removeAll()'],
    answer: 'set.clear()'
  },
  {
    question: '¿Qué propiedad se usa para obtener el número de elementos en un Set?',
    options: ['set.size', 'set.length', 'set.count', 'set.total'],
    answer: 'set.size'
  },
  {
    question: '¿Qué método devuelve un iterador de las claves en un Map?',
    options: ['map.keys()', 'map.values()', 'map.entries()', 'map.iterateKeys()'],
    answer: 'map.keys()'
  },
  {
    question: '¿Qué método devuelve un iterador de los valores en un Map?',
    options: ['map.keys()', 'map.values()', 'map.entries()', 'map.iterateValues()'],
    answer: 'map.values()'
  },
  {
    question: '¿Qué método devuelve un iterador de los pares clave-valor en un Map?',
    options: ['map.keys()', 'map.values()', 'map.entries()', 'map.iterateEntries()'],
    answer: 'map.entries()'
  },
  {
    question: '¿Qué método se usa para ejecutar una función para cada par clave-valor en un Map?',
    options: ['map.forEach()', 'map.each()', 'map.iterate()', 'map.run()'],
    answer: 'map.forEach()'
  },
  {
    question: '¿Qué método se usa para ejecutar una función para cada valor en un Set?',
    options: ['set.forEach()', 'set.each()', 'set.iterate()', 'set.run()'],
    answer: 'set.forEach()'
  },
  {
    question: '¿Cómo se puede convertir un Set en un Array?',
    options: ['Array.from(set)', '[...set]', 'set.toArray()', 'Ambas A y B'],
    answer: 'Ambas A y B'
  },
  {
    question: '¿Cómo se puede convertir un Map en un Array de pares clave-valor?',
    options: ['Array.from(map)', '[...map]', 'map.toArray()', 'Ambas A y B'],
    answer: 'Ambas A y B'
  },
    {
    question: '¿Cuál es la diferencia principal entre Map y Object en JavaScript?',
    options: ['Map permite claves no primitivas, Object no', 'Object permite claves no primitivas, Map no', 'No hay diferencia', 'Map no tiene métodos, Object sí'],
    answer: 'Map permite claves no primitivas, Object no'
  },
  {
    question: '¿Qué método devuelve un iterador de los valores en un Set?',
    options: ['set.keys()', 'set.values()', 'set.entries()', 'set.iterateValues()'],
    answer: 'set.values()'
  },
  {
    question: '¿Qué método devuelve un iterador de las entradas [valor, valor] en un Set?',
    options: ['set.keys()', 'set.values()', 'set.entries()', 'set.iterateEntries()'],
    answer: 'set.entries()'
  },
  {
    question: '¿Cómo se inicializa un Map con pares clave-valor?',
    options: ['new Map([["key1", "value1"], ["key2", "value2"]])', 'new Map({"key1": "value1", "key2": "value2"})', 'Map({"key1": "value1", "key2": "value2"})', 'Map([["key1", "value1"], ["key2", "value2"]])'],
    answer: 'new Map([["key1", "value1"], ["key2", "value2"]])'
  },
  {
    question: '¿Cómo se inicializa un Set con valores?',
    options: ['new Set([1, 2, 3])', 'new Set({1, 2, 3})', 'Set([1, 2, 3])', 'Set({1, 2, 3})'],
    answer: 'new Set([1, 2, 3])'
  },
  {
    question: '¿Qué método de un Map elimina un par clave-valor y retorna true si la clave existía?',
    options: ['delete', 'remove', 'erase', 'clear'],
    answer: 'delete'
  },
  {
    question: '¿Qué método de un Set elimina un valor y retorna true si el valor existía?',
    options: ['delete', 'remove', 'erase', 'clear'],
    answer: 'delete'
  },
  {
    question: '¿Cómo se obtiene la cantidad de elementos en un Map?',
    options: ['map.size', 'map.length', 'map.count', 'map.total'],
    answer: 'map.size'
  },
  {
    question: '¿Qué método se usa para combinar dos Sets en JavaScript?',
    options: ['union', 'concat', 'addAll', 'No existe un método específico, se usa el operador de propagación ...'],
    answer: 'No existe un método específico, se usa el operador de propagación ...'
  }
]} />
