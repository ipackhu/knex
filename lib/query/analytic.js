const assert = require('assert');

// JoinClause
// -------

// The "JoinClause" is an object holding any necessary info about a join,
// including the type, and any associated tables & columns being joined.
class Analytic {
  constructor(method, schema, alias, orderBy, partitions) {
    this.schema = schema;
    this.type = 'analytic';
    this.method = method;
    this.order = orderBy || [];
    this.partitions = partitions || [];
    this.alias = alias;
    this.and = this;

    this.grouping = 'columns';
  }

  partitionBy(column) {
    assert(
      Array.isArray(column) || typeof column === 'string',
      `The argument to an analytic partitionBy function must be either a string
            or an array of string.`
    );

    if (Array.isArray(column)) {
      this.partitions = this.partitions.concat(column);
    } else {
      this.partitions.push(column);
    }
    return this;
  }

  orderBy(column) {
    assert(
      Array.isArray(column) || typeof column === 'string',
      `The argument to an analytic orderBy function must be either a string
            or an array of string.`
    );

    if (Array.isArray(column)) {
      this.order = this.order.concat(column);
    } else {
      this.order.push(column);
    }
    return this;
  }
}

module.exports = Analytic;
