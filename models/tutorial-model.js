module.exports = mongoose => {
  let tutoSchema = mongoose.Schema(
    {
      title: { type: String },
      description: { type: String },
      published: { type: Boolean },
    },
    { timestamps: true }
  );

  tutoSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("tutorial", tutoSchema);
  return Tutorial;
};
