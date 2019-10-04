package org.umhan35;

/**
 * Lambda definition.
 */
public interface Command<T> {
    void execute(T t);
}
